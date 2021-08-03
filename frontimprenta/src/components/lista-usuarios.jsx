import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { Table, Container, Col, Row, InputGroup, FormControl, Button, Alert, Modal } from 'react-bootstrap';

import UsuarioDataService from "../services/servicio-usuario.js";

const ListaUsuarios = ({ usuario }) => {

  const [usuarios, setUsuarios] = useState([]);
  const [searchNombre, setSearchNombre] = useState("");
  //const [rol, setRol] = useState(props.usuario.result.tipo)

  const history = useHistory();
  //const { tipo } = props.usuario.result
  //console.log(tipo);

  //console.log(usuario);
  const [show, setShow] = useState(false);
  const [eliminado, setEliminado] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (u) => {
    setEliminado(u);
    setShow(true);
  };

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
    //console.log(id);
    
    UsuarioDataService.deleteUsuario(id)
      .then(response => {
        refreshList();
        setShow(false);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    
  }

  if (!usuario) return 'Cargando...';

  return (
    <div>
      {
        usuario.result.tipo === "admin" ? (
          <Container fluid>
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
                Está por eliminar al siguiente cliente: <b>{eliminado?.nombre}</b><br></br>
                Está seguro de continuar con la operación?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Cerrar
                </Button>
                <Button variant="danger" onClick={() => eliminarUsuario(eliminado?._id)}>Eliminar</Button>
              </Modal.Footer>
            </Modal>
            <Row>
              <Col>
                <h2 className="display-2">Listado de Clientes</h2>
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
                      <th>Estado</th>
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
                          <td className={usuario.verificado ? "text-success" : "text-danger"}>{usuario.verificado ? "Verificado" : "No verficado"}</td>
                          <td><button className="btn btn-warning" type="button" onClick={() => handleShow(usuario)}>Eliminar</button></td>
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