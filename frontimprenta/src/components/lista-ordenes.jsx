import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { Table, Container, Col, Row, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';
import moment from "moment";

import OrdenDataService from "../services/servicio-orden.js";
import UsuarioDataService from "../services/servicio-usuario.js";

const ListaOrdenes = ({ usuario }) => {
  const [ordenes, setOrdenes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const [searchEstado, setSearchEstado] = useState("");
  const [estados, setEstados] = useState(["Todos"]);

  const history = useHistory();

  //const { tipo } = props.usuario.result
  //console.log(tipo);

  //console.log(usuario);

  useEffect(() => {
    traerUsuarios();
    traerOrdenes();
    traerEstados();
    return () => {
      setOrdenes([]);
      setUsuarios([]);
    };
    //setRol(props.usuario.result.tipo)
  }, []);

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

  const traerOrdenes = () => {
    if (usuario?.result.tipo === "admin") {
      OrdenDataService.getListadoOrdenes()
        .then(response => {
          //console.log(response.data);
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
          if(response.data === null){
            setOrdenes([]);
          }
          else{
            setOrdenes(response.data.ordenes);
          }
          
        })
        .catch(e => {
          console.log(e);
        });
    }

  };

  const traerEstados = () => {
    OrdenDataService.getEstados()
      .then(response => {
        //console.log(response.data);
        setEstados(["Todas"].concat(response.data));

      })
      .catch(e => {
        console.log(e);
      });
  };

  const traerUsuarios = () => {
    UsuarioDataService.getListadoUsuarios()
      .then(response => {
        //console.log(response.data);
        setUsuarios(response.data.usuarios);

      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    traerOrdenes();
  }

  const find = (query, by) => {
    UsuarioDataService.find(query, by)
      .then(response => {
        //console.log(response.data); CRUZAR BUSQUEDA POR NOMBRE DE USUARIO Y SETEAR ORDENES
        //setOrdenes(response.data.ordenes);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNombre = () => {
    find(searchNombre, "nombre")
  };

  const findByEstado = () => {
    if (searchEstado === "todas") {
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
      return resultado.email;
    };
  };

  const SinOrdenes = () => (
    <h4>Todavía no has realizado ningún pedido. <Link to="/productos">Haz el tuyo!</Link></h4>
  );

  if (!usuario) return 'Cargando...';

  return (
    <div>
      {
        usuario?.result.tipo === "admin" ? (
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
                  <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={findByNombre}>Buscar</Button>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
              <Col sm={4}>
                <InputGroup className="mb-3">
                  <FormControl as="select" custom onChange={onChangeSearchEstado}>
                    <option value="todas">Todas</option>
                    <option value="pendiente">Pendiente de Pago</option>
                    <option value="pagado">Pagado/En realización</option>
                    <option value="entregado">Entregado al Cliente</option>
                  </FormControl>
                  <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={findByEstado}>Buscar</Button>
                  </InputGroup.Append>
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
                          <td className="text-capitalize"><Link to={{ pathname: "/orden/" + orden._id, state: { ordenActual: orden } }} className="btn btn-primary">Ver Items</Link></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Col>
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
          </Container>
        )
      }
    </div>
  );
}

export default ListaOrdenes;