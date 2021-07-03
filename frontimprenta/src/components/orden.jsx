import React, { useState, useEffect } from "react"
import { Link, useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

import OrdenDataService from "../services/servicio-orden.js";

const Orden = ({ match, usuario }) => {

  const [orden, setOrden] = useState(null)
  //const { search } = useLocation();
  //const history = useHistory();

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

  useEffect(() => {
    obtenerOrden(match.params.id);
  }, [match.params.id]);

  return (
    <Container>
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
                  <p>Orden de Trabajo número {orden?._id}</p>
                  <p className="text-capitalize">Estado de la Orden: {orden?.estado}</p>
                </div>
                <div>
                  <p>Subtotal ({!orden ? 0 : orden.items.length}) items:</p>
                  <p>$ {!orden ? 0 : orden.factura}</p>
                </div>
                <div className="d-grid gap-2">
                  <Link to={"/ordenes"} className="btn btn-primary">Volver</Link>
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
                  <p>Orden de Compra número {orden?._id}</p>
                  <p className="text-capitalize">Estado de la Orden: {orden?.estado}</p>
                </div>
                <div>
                  <p>Subtotal ({!orden ? 0 : orden.items.length}) items:</p>
                  <p>$ {!orden ? 0 : orden.factura}</p>
                </div>
                <div className="d-grid gap-2">
                  <Link to={"/ordenes"} className="btn btn-primary">Volver</Link>
                </div>
              </Col>
            </Row>
          </div>
        )
      }
    </Container>
  );
}

export default Orden;