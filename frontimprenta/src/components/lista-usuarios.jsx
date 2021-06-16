import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom";
import { Table, Container, Col, Row, InputGroup, FormControl, Button, Alert } from 'react-bootstrap';

import UsuarioDataService from "../services/servicio-usuario.js";

const ListaUsuarios = props => {

  const [usuarios, setUsuarios] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  const [rol, setRol] = useState(props.usuario.result.tipo)

  const history = useHistory();
  //const { tipo } = props.usuario.result
  //console.log(tipo);

  useEffect(() => {
    traerUsuarios();
    //setRol(props.usuario.result.tipo)
  }, []);

  const onChangeSearchNombre = e => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
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
    traerUsuarios();
  }

  const find = (query, by) => {
    UsuarioDataService.find(query, by)
      .then(response => {
        //console.log(response.data);
        setUsuarios(response.data.usuarios);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByNombre = () => {
    find(searchNombre, "nombre")
  };

  const eliminarUsuario = (id) => {
    UsuarioDataService.deleteUsuario(id)
      .then(response => {
        refreshList()
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div>
      {
        rol === "admin" ? (
          <Container fluid>
            <Row>
              <Col>
                <h1>Listado de Clientes</h1>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
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
                <Button variant="outline-info" onClick={refreshList}>Todos</Button>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Nombre Completo</th>
                      <th>Email</th>
                      <th>Teléfono</th>
                      <th>Dirección</th>
                      <th>Localidad</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      usuarios.map(usuario => (
                        <tr key={usuario._id}>
                          <td>{usuario.nombre}</td>
                          <td>{usuario.email}</td>
                          <td>{usuario.telefono}</td>
                          <td className="text-capitalize">{usuario.direccion.calle} {usuario.direccion.numero}</td>
                          <td className="text-capitalize">{usuario.direccion.localidad}</td>
                          <td><button className="btn btn-danger" type="button" onClick={() => { eliminarUsuario(usuario._id) }}>Eliminar</button></td>
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

export default ListaUsuarios;