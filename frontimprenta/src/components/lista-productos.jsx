import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
//import { Modal, Button } from 'react-bootstrap';
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

import ProductoDataService from "../services/servicio-producto";
import logo from "../assets/IntegralLogo.png";

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
        console.log(response.data);
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
      alert("Producto agregado con éxito!")
    }
    else {
      alert("Debes iniciar sesión!");
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
          Está por eliminar el siguiente producto: <b>{eliminado?.nombre_producto}</b><br></br>
          Está seguro de continuar con la operación?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={() => eliminarProducto(eliminado?._id, eliminado?.imagen.id)}>Eliminar</Button>
        </Modal.Footer>
      </Modal>
      <Container fluid>
        <Row className="my-2">
          <Col>
            <h2 className="display-2">{usuario?.result.tipo === "admin" ? "Listado de Productos" : "Nuestros Productos"}</h2>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col sm={6}>
            <InputGroup className="mb-3">
              <FormControl
                type="text"
                placeholder="Búsqueda por nombre"
                aria-label="Nombre del Producto"
                aria-describedby="basic-addon2"
                value={searchNombre}
                onChange={onChangeSearchNombre}
              />

              <Button variant="outline-secondary" onClick={findByNombre}>Buscar</Button>

            </InputGroup>
          </Col>
          <Col sm={4}>
            <InputGroup className="mb-3">
              <FormControl as="select" onChange={onChangeSearchCategoria}>
                {categorias.map(categoria => {
                  return (
                    <option key={categoria} value={categoria}> {categoria.substr(0, 20)} </option>
                  )
                })}
              </FormControl>

              <Button variant="outline-secondary" onClick={findByCategoria}>Buscar</Button>

            </InputGroup>
          </Col>
        </Row>
      </Container>
      {usuario?.result.tipo === "admin" ? (
        <Container fluid>
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
                <th scope="col">Precio</th>
                <th scope="col">Precio Oferta</th>
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
                    <td>{producto.precio}</td>
                    <td>{producto.precio_oferta}</td>
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
        <Row className="my-4">
          {productos.map((producto) => {
            return (
              <Col key={producto._id}>
                <Card style={{ width: '18rem' }} className="my-2">
                  <Card.Img
                    variant="top"
                    src={producto?.imagen.url === "" ? logo : producto.imagen.url}
                    alt="Integral Imagen"
                    height="225px"
                  />
                  <Card.Body>
                    <Card.Title>
                      {producto.nombre_producto}
                      {producto.oferta && (<Badge pill bg="success" className="m-2">Oferta!!</Badge>)}
                    </Card.Title>
                    <Card.Text>
                      <strong>Categoría: </strong>{producto.categoria}<br />
                      <strong>Precio: </strong>${producto.oferta ? (producto.precio_oferta) : (producto.precio) } por {producto.provision}
                    </Card.Text>
                    <Row>
                      <Link to={"/productos/" + producto._id} className="btn btn-primary my-2 btn-block">
                        Ver Producto
                      </Link>
                      <Button variant="dark" onClick={() => handleOnClick(producto._id)}>Agrerar al Pedido</Button>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
}

export default ListaProductos;