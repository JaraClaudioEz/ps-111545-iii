import React from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

const Pedido = () => {
  return (
    <Container>
      <Row>
        <Col sm={8}>
          <h1>Lista productos del pedido</h1>
        </Col>
        <Col sm={4}>
          <div>
            <p>Subtotal (0) items</p>
            <p>$5555</p>
          </div>
          <div>
            <Button variant="dark">Proceder a la Compra</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Pedido;