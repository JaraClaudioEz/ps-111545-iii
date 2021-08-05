import React, { useState, useEffect, useRef } from "react"
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Table, Form } from 'react-bootstrap';

import { useReactToPrint } from "react-to-print";

import OrdenDataService from "../services/servicio-orden.js";

const Orden = ({ match, usuario }) => {

  const [orden, setOrden] = useState(null);
  const [estados, setEstados] = useState([]);
  const [cambioEstado, setCambioEstado] = useState(false);
  //const { search } = useLocation();
  const history = useHistory();

  useEffect(() => {
    traerEstados();
    obtenerOrden(match.params.id);
  }, [match.params.id]);

  const obtenerOrden = id => {
    OrdenDataService.getOrden(id)
      .then(response => {
        setOrden(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const traerEstados = () => {
    OrdenDataService.getEstados()
      .then(response => {
        //console.log(response);
        setEstados(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleCambioEstado = event => {
    const value = event.target.value;
    cambiarEstadoOrden();
    setOrden({ ...orden, [event.target.name]: value });
  };

  const cambiarEstadoOrden = () => setCambioEstado(true);

  const guardarCambios = async () => {
    if (cambioEstado) {
      let data = {
        idOrden: orden._id,
        estado: orden.estado
      };
      try {
        const respuesta = await OrdenDataService.updateOrden(data)
        console.log(respuesta);
      } catch (error) {
        console.log(error);
      }
    }
    history.push("/ordenes");
  };
  //console.log(cambioEstado);

  class ComponentToPrint extends React.Component {
    render() {
      return (
        <Container className="my-5">
          <Row>
            <Col>
              <h4 className="display-6">Orden de Trabajo N° <b>{orden?.numero}</b></h4>
            </Col>
          </Row>
          <Row>
            <Col sm={8}>
              <Table striped>
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    orden?.items.map(item => (
                      <tr key={item.idProducto}>
                        <td className="text-capitalize">{item.nombre}</td>
                        <td>{item.cantidad}</td>
                        <td>$ {item.precio}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </Table>
            </Col>
            <Col sm={4}>
              <div>
                <p className="text-capitalize">Estado de la Orden: <b>{orden?.estado}</b></p>
              </div>
              <div>
                <p>Total abonado: <b>$ {!orden ? 0 : orden.factura}</b></p>
              </div>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Container className="my-5">
      {
        usuario?.result.tipo === "admin" ? (
          <div>
            <Row>
              <Col>
                <h4 className="display-4">Productos de la Orden de Trabajo:</h4>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orden?.items.map(item => (
                        <tr key={item.idProducto}>
                          <td className="text-capitalize">{item.nombre}</td>
                          <td>{item.cantidad}</td>
                          <td>$ {item.precio}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Col>
              <Col sm={4}>
                <div>
                  <p>Orden de Trabajo N° <b>{orden?.numero}</b></p>
                  <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                      <Form.Label>Estado de la Orden: </Form.Label>
                      <Form.Control as="select" custom name="estado" value={orden?.estado} onChange={handleCambioEstado}>
                        {estados.map(estado => {
                          return (
                            <option key={estado} value={estado} className="text-capitalize"> {estado.substr(0, 40)} </option>
                          )
                        })}
                      </Form.Control>
                    </Form.Group>
                  </Form>
                </div>
                <div>
                  <p>Total abonado: <b>$ {!orden ? 0 : orden.factura}</b></p>
                </div>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={guardarCambios}>{cambioEstado ? "Guardar Cambios" : "Volver"}</Button>
                  <div style={{ display: "none" }}><ComponentToPrint ref={componentRef} /></div>
                  <Button variant="info" onClick={handlePrint}>Imprimir</Button>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Row>
              <Col>
                <h4 className="display-4">Productos solicitados en tu compra:</h4>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Cantidad</th>
                      <th>Precio Unitario</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      orden?.items.map(item => (
                        <tr key={item.idProducto}>
                          <td className="text-capitalize">{item.nombre}</td>
                          <td>{item.cantidad}</td>
                          <td>$ {item.precio}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>
              </Col>
              <Col sm={4}>
                <div>
                  <p>Orden de Compra N° <b>{orden?.numero}</b></p>
                  <p className="text-capitalize">Estado de la Orden: <b>{orden?.estado}</b></p>
                </div>
                <div>
                  <p>Total abonado: <b>$ {!orden ? 0 : orden.factura}</b></p>
                </div>
                <div className="d-grid gap-2">
                  <Link to={"/ordenes"} className="btn btn-primary">Volver</Link>
                </div>
              </Col>
            </Row>
          </div>
        )
      }
    </Container >
  );
}

export default Orden;