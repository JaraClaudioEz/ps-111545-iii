import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom";
import { Table, Container, Col, Row, InputGroup, FormControl, Button, Alert, Modal, Pagination } from 'react-bootstrap';

import UsuarioDataService from "../services/servicio-usuario.js";
import AccessDenied from "../components/403.jsx";

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

  const [actual, setActual] = useState(1);
  const [paginas, setPaginas] = useState(null);
  const [items, setItems] = useState([]);
  let primera = false;

  const handleClose = () => setShow(false);
  const handleShow = (u) => {
    setEliminado(u);
    setShow(true);
  };

  useEffect(() => {
    traerUsuarios(actual);
  }, []);

  const onChangeSearchNombre = e => {
    const searchNombre = e.target.value;
    setSearchNombre(searchNombre);
  };

  const traerUsuarios = (pag) => {
    UsuarioDataService.getListadoUsuarios(pag - 1)
      .then(response => {

        const totalPages = Math.ceil(response.data.total_resultados / 20); //cantidad registros hardcoded
        setPaginas(totalPages);
        //console.log(paginas);

        setUsuarios(response.data.usuarios);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    traerUsuarios(actual);
  }

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
    traerUsuarios(numero);
    setItems([]);
    primera = false;

  };

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

  //if (!usuario) return 'Cargando...';

  return (
    <div>
      {usuario ? (
        <div>
          {
            usuario.result.tipo === "admin" ? (
              <Container>
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
                    Est?? por eliminar al siguiente cliente: <b>{eliminado?.nombre}</b><br></br>
                    Est?? seguro de continuar con la operaci??n?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => eliminarUsuario(eliminado?._id)}>Eliminar</Button>
                  </Modal.Footer>
                </Modal>
                <Row>
                  <Col>
                    <h4 className="display-4">Listado de Clientes</h4>
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
                      <Button variant="outline-secondary" onClick={findByNombre}>Buscar</Button>
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
                          <th>Tel??fono</th>
                          <th>Direcci??n</th>
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
                <Row>
                  <Pagination className="justify-content-center">
                    {items}
                  </Pagination>
                </Row>
              </Container>
            ) : (
              <AccessDenied />
            )
          }
        </div>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
}

export default ListaUsuarios;