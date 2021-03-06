import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { Table, Container, Col, Row, InputGroup, FormControl, Button, Pagination } from 'react-bootstrap';
import moment from "moment";

import OrdenDataService from "../services/servicio-orden.js";
import UsuarioDataService from "../services/servicio-usuario.js";
import AccessDenied from "../components/403.jsx";

const ListaOrdenes = ({ usuario }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const [searchEstado, setSearchEstado] = useState("");
  const [estados, setEstados] = useState(["Todos"]);

  const [user, setUser] = useState(usuario);

  //const history = useHistory();

  const [actual, setActual] = useState(1);
  const [paginas, setPaginas] = useState(null);
  const [items, setItems] = useState([]);
  let primera = false;

  //console.log(usuario);
  //console.log(usuarios);
  //console.log(ordenes);

  const onChangeSearchNombre = e => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const onChangeSearchEstado = e => {
    const searchEstado = e.target.value;
    setSearchEstado(searchEstado);
  };

  const obtenerUsuario = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem('perfil'));
      //console.log(usuario);
      setUser(usuario);
    } catch (error) {
      console.log(error);
    }
  };

  const traerOrdenes = (pag) => {
    //console.log(user);
    if (usuario?.result.tipo === "admin") {
      OrdenDataService.getListadoOrdenes(pag - 1)
        .then(response => {
          //console.log(response.data);

          const totalPages = Math.ceil(response.data.total_resultados / 20); //cantidad registros hardcoded
          setPaginas(totalPages);
          setItems([]);
          setOrdenes(response.data.ordenes);
        })
        .catch(e => {
          console.log(e);
        });
    }
    else {
      OrdenDataService.getOrdenesUsuario(usuario?.result._id)
        .then(response => {
          //console.log(response.data);
          if (response.data === null) {
            setOrdenes([]);
          }
          else {

            const totalPages = Math.ceil(response.data.total_resultados / 20); //cantidad registros hardcoded
            setPaginas(totalPages);

            setOrdenes(response.data.ordenes);
          }

        })
        .catch(e => {
          console.log(e);
        });
    }

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
    //armarPaginacion();
    setActual(numero);

    if (searchEstado !== "Todos") {
      findByEstado(numero)
    }
    else {
      traerOrdenes(numero);
    }
    //setItems([]);
    primera = false;

  }; //   619d669f99124791fd4934d0

  const traerEstados = () => {
    OrdenDataService.getEstados()
      .then(response => {
        //console.log(response.data);
        setEstados(["Todos"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };

  const traerUsuarios = () => {
    UsuarioDataService.getListadoUsuarios(0)
      .then(response => {
        //console.log(response.data);
        setUsuarios(response.data.usuarios);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    traerOrdenes(1);
    //setItems([]); FALTA CORREGIR LIMPIEZA DE ARRAY CUANDO SE BUSCA "TODOS"
  }

  const find = (query, by, pag) => {

    OrdenDataService.find(query, by, pag - 1)
      .then(response => {
        //console.log(response.data); //CRUZAR BUSQUEDA POR NOMBRE DE USUARIO Y SETEAR ORDENES

        const totalPages = Math.ceil(response.data.total_resultados / 20); //cantidad registros hardcoded
        setPaginas(totalPages);
        setItems([]);
        setOrdenes(response.data.ordenes);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNombre = () => {
    find(searchNombre, "nombre")
  };

  const findByEstado = (num) => {
    if (searchEstado === "Todos") {
      refreshList();
    } else {
      find(searchEstado, "estado", num)
      setItems([]);
    }
  };

  const buscarNombre = (id) => {
    if (usuarios) {
      const resultado = usuarios.find(user => user._id === id);
      return resultado?.nombre;
    };
  };

  const buscarEmail = (id) => {
    if (usuarios) {
      const resultado = usuarios.find(usuario => usuario._id === id);
      return resultado?.email;
    };
  };

  const SinOrdenes = () => (
    <h4>Todav??a no has realizado ning??n pedido. <Link to="/productos">Haz el tuyo!</Link></h4>
  );

  useEffect(() => {
    obtenerUsuario();
    traerUsuarios();
    //traerOrdenes(actual);
    traerEstados();

    return () => {
      setOrdenes([]);
      setUsuarios([]);
    };
  }, []);

  useEffect(() => {
    traerOrdenes(actual);
  }, [user]);
  /*
    useEffect(() => {
      setItems([]);
    }, [paginas]);
  */

  //if (!usuario) return 'Cargando...';

  return (
    <div>
      {usuario ? (
        <div>
          {
            user.result.tipo === "admin" ? (
              <Container>
                <Row>
                  <Col>
                    <h4 className="display-4">Listado de ??rdenes</h4>
                  </Col>
                </Row>
                <Row>
                  {/*
              <Col sm={6}>
                <InputGroup className="mb-3">
                  <FormControl
                    type="text"
                    placeholder="Nombre del Cliente"
                    aria-label="Nombre del Cliente"
                    aria-describedby="basic-addon2"
                    value={searchNombre}
                    onChange={onChangeSearchNombre}
                  />
                  <Button variant="outline-secondary" onClick={findByNombre}>Buscar</Button>
                </InputGroup>
              </Col>
              */}
                  <Col sm={4}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text>
                        Estado
                      </InputGroup.Text>
                      <FormControl as="select" onChange={onChangeSearchEstado}>
                        {estados.map(estado => {
                          return (
                            <option key={estado} value={estado}> {estado.substr(0, 20)} </option>
                          )
                        })}
                      </FormControl>
                      <Button variant="outline-secondary" onClick={() => findByEstado(actual)}>Buscar</Button>
                    </InputGroup>
                  </Col>
                  {/* 
              <Col sm={2}>
                <Button variant="outline-info" onClick={refreshList}>Todos</Button>
              </Col>
              */}
                </Row>
                <Row>
                  <Col>
                    <Table striped hover>
                      <thead>
                        <tr>
                          <th>Nombre Cliente</th>
                          <th>Email</th>
                          <th>Importe Abonado</th>
                          <th>Fecha Compra</th>
                          <th className="text-center">Estado Orden</th>
                          <th className="text-center">Items Solicitados</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          ordenes?.map(orden => (
                            <tr key={orden._id}>
                              <td className="text-capitalize">{buscarNombre(orden.idUsuario)}</td>
                              <td>{buscarEmail(orden.idUsuario)}</td>
                              <td className="text-center">$ {orden.factura}</td>
                              <td>{moment(orden.fecha).format('LL')}</td>
                              <td className="text-capitalize text-center">{orden.estado}</td>
                              <td className="text-capitalize text-center"><Link to={{ pathname: "/orden/" + orden._id, state: { ordenActual: orden } }} className="btn btn-primary">Orden</Link></td>
                            </tr>
                          ))
                        }
                      </tbody>
                    </Table>
                  </Col>
                </Row>
                <Row>
                  <Pagination className="justify-content-center">
                    {items}
                  </Pagination>
                </Row>
              </Container>
            ) : (
              <div>
                <Container className="px-0" fluid>
                  <Row className="head py-4 mx-0">
                    <Col></Col>
                    <Col xs={8}>
                      <h3 className="display-3 px-0">Mis ??rdenes de Compra</h3>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row className="landing py-2 mx-0">
                    <Col md={{ span: 8, offset: 2 }} className="px-0">
                      {!ordenes && <SinOrdenes />}
                      <Table striped hover variant="dark">
                        <thead>
                          <tr>
                            <th>Fecha Compra</th>
                            <th>Importe Abonado</th>
                            <th className="text-center">Estado Orden</th>
                            <th className="text-center">Items Solicitados</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            ordenes?.map(orden => (
                              <tr key={orden._id}>
                                <td>{moment(orden.fecha).format('LL')}</td>
                                <td>$ {orden.factura}</td>
                                <td className="text-capitalize text-center">{orden.estado}</td>
                                <td className="text-capitalize text-center"><Link to={{ pathname: "/orden/" + orden._id, state: { ordenActual: orden } }} className="btn btn-primary">Ver Detalle</Link></td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </Table>
                    </Col>
                  </Row>

                </Container>
              </div>
            )
          }
        </div>
      ) : (
        <AccessDenied />
      )}
    </div>

  );
}

export default ListaOrdenes;

/*
<Row>
  <Pagination className="justify-content-center">
    {items}
  </Pagination>
</Row>
*/