import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Pagination from 'react-bootstrap/Pagination';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';

import ProductoDataService from "../services/servicio-producto";
import logo from "../assets/integral.png"

const ListaProductos = ({ usuario, alAgregarAlPedido }) => {
  const [productos, setProductos] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const [searchCategoria, setSearchCategoria] = useState("");
  const [categorias, setCategorias] = useState(["Todas"]);
  const history = useHistory();

  const [show, setShow] = useState(false);
  const [eliminado, setEliminado] = useState();

  const [actual, setActual] = useState(1);
  const [paginas, setPaginas] = useState(null);
  const [items, setItems] = useState([]);
  let primera = false;

  const chek = <FontAwesomeIcon icon={faCheckCircle} />

  const handleClose = () => setShow(false);
  const handleShow = (p) => {
    setEliminado(p);
    setShow(true);
  };

  //const usuario = props.usuario
  //console.log(usuario);

  useEffect(() => {
    traerProductos(actual);
    traerCategorias();
  }, []);

  const onChangeSearchNombre = e => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const onChangeSearchCategoria = e => {
    const searchCategoria = e.target.value;
    setSearchCategoria(searchCategoria);
  };

  const traerProductos = (pag) => {

    ProductoDataService.getListadoProductos(pag - 1)
      .then(response => {
        //console.log(response.data);

        const totalPages = Math.ceil(response.data.total_resultados / 20); //cantidad registros hardcoded
        setPaginas(totalPages);

        setProductos(response.data.productos);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const traerCategorias = () => {
    ProductoDataService.getCategorias()
      .then(response => {
        //console.log(response.data);
        setCategorias(["Todas"].concat(response.data));

      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (!primera) {
      armarPaginacion();
      primera = true;
    };
  }, [paginas, items]);

  const armarPaginacion = () => {

    for (let number = 1; number <= paginas; number++) {
      items.push(
        <Pagination.Item key={number} active={number === actual} onClick={() => irPagina(number)}>
          {number}
        </Pagination.Item>,
      );
    }
  };

  const irPagina = (numero) => {

    setActual(numero);
    traerProductos(numero);
    setItems([]);
    primera = false;

  };

  const refreshList = () => {
    traerProductos(actual);
  }

  const eliminarProducto = (id, idImagen) => {
    //console.log(id, idImagen);

    ProductoDataService.deleteImagen(idImagen)
      .then(response => {
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

    ProductoDataService.deleteProducto(id)
      .then(response => {
        refreshList()
        setShow(false);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });

  }

  const find = (query, by) => {
    ProductoDataService.find(query, by)
      .then(response => {
        //console.log(response.data);
        setProductos(response.data.productos);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNombre = () => {
    find(searchNombre, "nombre")
  };

  const findByCategoria = () => {
    if (searchCategoria === "Todas") {
      refreshList();
    } else {
      find(searchCategoria, "categoria")
    }
  };

  const handleOnClick = (id) => {
    if (usuario !== null) {
      alAgregarAlPedido(id, 1)
      alert("Producto agregado con ??xito!")
    }
    else {
      alert("Debes iniciar sesi??n!");
      history.push("/autorizacion")
    }
  };

  //() => { eliminarProducto(producto._id, producto.imagen.id) }

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Atencion!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Est?? por eliminar el siguiente producto: <b>{eliminado?.nombre_producto}</b><br></br>
          Est?? seguro de continuar con la operaci??n?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => eliminarProducto(eliminado?._id, eliminado?.imagen.id)}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
      <div className="head" >
        <Container >
          <Row className="py-2">
            <Col sm={8} className="mt-4">
              <h3 className="display-4">{usuario?.result.tipo === "admin" ? "Listado de Productos" : "Tienda"}</h3>
            </Col>
            <Col sm={4} className="p-3">
              <Image src={logo} alt='Integral Imagen' fluid />
            </Col>
          </Row>
          <Row >
            <Col sm={4}>
              <InputGroup className="mb-3">
                <FormControl
                  type="text"
                  placeholder="B??squeda por nombre"
                  aria-label="Nombre del Producto"
                  aria-describedby="basic-addon2"
                  value={searchNombre}
                  onChange={onChangeSearchNombre}
                />
                <Button variant="secondary" onClick={findByNombre}>Buscar</Button>
              </InputGroup>
            </Col>
            <Col sm={4}>
              <InputGroup className="mb-3">
                <InputGroup.Text>
                  Categor??a
                </InputGroup.Text>
                <FormControl as="select" onChange={onChangeSearchCategoria}>
                  {categorias.map(categoria => {
                    return (
                      <option key={categoria} value={categoria}> {categoria.substr(0, 20)} </option>
                    )
                  })}
                </FormControl>
                <Button variant="secondary" onClick={findByCategoria}>Buscar</Button>
              </InputGroup>
            </Col>
          </Row>
        </Container>
      </div>

      {usuario?.result.tipo === "admin" ? (
        <Container>
          <Row className="my-2">
            <Col>
              <Link to={"/productos/agregar"} className="btn btn-primary">nuevo producto +</Link>
            </Col>
          </Row>
          <Table striped hover>
            <thead>
              <tr>
                <th scope="col">Producto</th>
                <th scope="col">Categoria</th>
                <th scope="col">Especificaciones</th>
                <th scope="col" className="text-center">Precio</th>
                <th scope="col" className="text-center">En Oferta</th>
                <th scope="col" className="text-center">Precio Oferta</th>
                <th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {
                productos.map(producto => (
                  <tr key={producto._id}>
                    <td>{producto.nombre_producto}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.especificaciones}</td>
                    <td className="text-center">${producto.precio}</td>
                    <td style={{ color: "green" }} className="text-center">{producto.oferta && chek}</td>
                    <td className="text-center">{producto.precio_oferta ? `$${producto.precio_oferta}` : ""}</td>
                    <td><Link to={{ pathname: "/productos/" + producto._id, state: { productoActual: producto } }} className="btn btn-primary">Ver</Link></td>
                    <td><Link to={{ pathname: "/productos/agregar/" + producto._id, state: { productoActual: producto } }} className="btn btn-success">Editar</Link></td>
                    <td><button className="btn btn-warning" type="button" onClick={() => handleShow(producto)}>Eliminar</button></td>
                    <td />
                  </tr>
                ))
              }
            </tbody>
          </Table>
          <Row>
            <Pagination className="justify-content-center">
              {items}
            </Pagination>
          </Row>
        </Container>
      ) : (
        <div className="landing">
          <Container>
            <Row className="py-4">
              {productos.map((producto) => {
                return (
                  <Col key={producto._id}>
                    <Card style={{ width: '18rem' }} className="my-1" bg="dark">
                      <div className="container m-0 p-0">
                        <Card.Img
                          variant="top"
                          src={producto?.imagen.url === "" ? logo : producto.imagen.url}
                          alt="Integral Imagen"
                          height="275px"
                        />
                        {producto.oferta && (
                          <div id="mostrar">
                            <Card.ImgOverlay className="text-end">
                              <h2><Badge pill bg="success" className="mx-2">OFERTA!!</Badge></h2>
                            </Card.ImgOverlay>
                          </div>

                        )}
                      </div>
                      <Card.Body>
                        <Card.Title className="mb-0">
                          {producto.nombre_producto}
                        </Card.Title>
                        <Card.Text style={{ height: '56px' }}>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <span className="text-muted text-decoration-line-through" hidden={!producto.oferta} style={{ fontSize: '14px' }}>${producto.precio}</span><br />
                          <strong>Precio: </strong>${producto.oferta ? (producto.precio_oferta) : (producto.precio)} por {producto.provision} <br />
                          {producto.especificaciones}
                        </Card.Text>
                        <Row>
                          <Link to={"/productos/" + producto._id} className="btn btn-danger mb-2 btn-block">
                            Ver Producto
                          </Link>
                          <Button variant="light" onClick={() => handleOnClick(producto._id)}>Agrerar al Pedido</Button>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
}

export default ListaProductos;