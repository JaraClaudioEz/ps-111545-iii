import React from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

import ItemPedido from "./item-pedido";
//import OrdenDataService from "./services/servicio-orden.js";

const Pedido = ({ pedido, agregarAlPedido, handleQuitarItemPedido, handleVaciarPedido }) => {

  const PedidoVacio = () => (
    <h4>No tienes items en tu pedido. <Link to="/productos">Comienza a agregar!</Link></h4>
  );

  const PedidoCompleto = () => (
    <Col>
      {pedido.items.map((item) => (
        <Row key={item._id}>
          <ItemPedido item={item} alAgregarItemPedido={agregarAlPedido} alQuitarItemPedido={handleQuitarItemPedido}/>
        </Row>
      ))}
    </Col>
  );

  const submitCheckout = async () =>{
    try {
      
    } catch (error) {
      console.log(error);
    }
  };

  if(!pedido) return 'Cargando...';

  return (
    <Container>
      <Row>
        <Col>
          <h4 className="display-4">Lista productos de tu pedido:</h4>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          {
            !pedido? <PedidoVacio /> : <PedidoCompleto />
          }
        </Col>
        <Col sm={4}>
          <div>
            <p>Subtotal ({!pedido ? 0 : pedido.items.length}) items:</p>
            <p>$ {!pedido ? 0 : pedido.importe}</p>
          </div>
          <div className="d-grid gap-2">
            <Button variant="dark" size="lg" onClick={submitCheckout}>Proceder a la Compra</Button>
            <Button variant="warning" size="lg" onClick={() => handleVaciarPedido()}>Vaciar Pedido</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Pedido;