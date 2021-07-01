import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { Table, Container, Col, Row, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
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
    OrdenDataService.getListadoOrdenes()
      .then(response => {
        //console.log(response.data);
        setOrdenes(response.data.ordenes);

      })
      .catch(e => {
        console.log(e);
      });
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
      const resultado = usuarios.find(usuario => usuario._id === id);
      return resultado.nombre;
    };
  };

  const buscarEmail = (id) => {
    if (usuarios) {
      const resultado = usuarios.find(usuario => usuario._id === id);
      return resultado.email;
    };
  };

  if (!usuario || !ordenes || !usuarios) return 'Cargando...';

  return (
    <div>
      {
        usuario.result.tipo === "admin" ? (
          <Container fluid>
            <Row>
              <Col>
                <h1 className="display-1">Listado de Ordenes</h1>
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
                      <th>Items Solicitados</th>
                      <th>Estado Orden</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      ordenes.map(orden => (
                        <tr key={orden._id}>
                          <td className="text-capitalize">{buscarNombre(orden.idUsuario)}</td>
                          <td>{buscarEmail(orden.idUsuario)}</td>
                          <td>$ {orden.factura}</td>
                          <td>{moment(orden.fecha).format('LL')}</td>
                          <td className="text-capitalize"><Button>Ver Items</Button></td>
                          <td className="text-capitalize">{orden.estado}</td>
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
                <Alert variant="danger" onClose={() => history.push("/")} dismissible>
                  <Alert.Heading>Oh! No tienes permisos para ver esta página!</Alert.Heading>
                  <p>
                    Por favor inicia sesión para acceder.
                  </p>
                </Alert>
              </Col>
            </Row>
          </Container>
        )
      }
    </div>
  );
}

export default ListaOrdenes;