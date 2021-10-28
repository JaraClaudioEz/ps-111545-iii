import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { Table, Container, Col, Row, InputGroup, FormControl, Button, Pagination } from 'react-bootstrap';
import moment from "moment";

import OrdenDataService from "../services/servicio-orden.js";
import UsuarioDataService from "../services/servicio-usuario.js";

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

    setActual(numero);
    traerOrdenes(numero);
    setItems([]);
    primera = false;

  };

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
    traerOrdenes(actual);
    //setItems([]); FALTA CORREGIR LIMPIEZA DE ARRAY CUANDO SE BUSCA "TODOS"
  }

  const find = (query, by) => {
    OrdenDataService.find(query, by)
      .then(response => {
        console.log(response.data); //CRUZAR BUSQUEDA POR NOMBRE DE USUARIO Y SETEAR ORDENES

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

  const findByEstado = () => {
    if (searchEstado === "Todos") {
      refreshList();
    } else {
      find(searchEstado, "estado")
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
    <h4>Todavía no has realizado ningún pedido. <Link to="/productos">Haz el tuyo!</Link></h4>
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

  if (!usuario) return 'Cargando...';

  return (
    <div>
      {
        user.result.tipo === "admin" ? (
          <Container fluid>
            <Row>
              <Col>
                <h2 className="display-2">Listado de Ordenes</h2>
              </Col>
            </Row>
            <Row>
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
              <Col sm={4}>
                <InputGroup className="mb-3">
                  <FormControl as="select" onChange={onChangeSearchEstado}>
                    {estados.map(estado => {
                      return (
                        <option key={estado} value={estado}> {estado.substr(0, 20)} </option>
                      )
                    })}
                  </FormControl>
                  <Button variant="outline-secondary" onClick={findByEstado}>Buscar</Button>
                </InputGroup>
              </Col>
              <Col sm={2}>
                <Button variant="outline-info" onClick={refreshList}>Todos</Button>
              </Col>
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
                      <th>Estado Orden</th>
                      <th>Items Solicitados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      ordenes?.map(orden => (
                        <tr key={orden._id}>
                          <td className="text-capitalize">{buscarNombre(orden.idUsuario)}</td>
                          <td>{buscarEmail(orden.idUsuario)}</td>
                          <td>$ {orden.factura}</td>
                          <td>{moment(orden.fecha).format('LL')}</td>
                          <td className="text-capitalize">{orden.estado}</td>
                          <td className="text-capitalize"><Link to={{ pathname: "/orden/" + orden._id, state: { ordenActual: orden } }} className="btn btn-primary">Orden</Link></td>
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
          <Container fluid>
            <Row>
              <Col>
                <h3 className="display-3">Mis Ordenes de Compra</h3>
              </Col>
            </Row>
            <Row>
              <Col>
                {!ordenes && <SinOrdenes />}
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Fecha Compra</th>
                      <th>Importe Abonado</th>
                      <th>Estado Orden</th>
                      <th>Items Solicitados</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      ordenes?.map(orden => (
                        <tr key={orden._id}>
                          <td>{moment(orden.fecha).format('LL')}</td>
                          <td>$ {orden.factura}</td>
                          <td className="text-capitalize">{orden.estado}</td>
                          <td className="text-capitalize"><Link to={{ pathname: "/orden/" + orden._id, state: { ordenActual: orden } }} className="btn btn-primary">Ver Detalle</Link></td>
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

        )
      }
    </div>
  );
}

export default ListaOrdenes;