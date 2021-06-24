import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

import ItemPedido from "./item-pedido";
//import PedidoDataService from "../services/servicio-pedido.js";

const Pedido = ({ pedido, agregarAlPedido, handleQuitarItemPedido, handleVaciarPedido }) => {

  //const pedidoVacio = false;

  //const [pedidoActual, setPedidoActual] = useState({});

  //console.log(pedido);
  //console.log(pedidoActual);

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

  /*
  const obtenerPedido = async (id) => {
    try {
      const response = await PedidoDataService.getProductosPedido(id);
      console.log(response);
      setPedidoActual(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    obtenerPedido(pedido.idUsuario);
  }, []);
  */

  if(!pedido.items) return 'Cargando...';

  return (
    <Container>
      <Row>
        <Col>
          <h1>Lista productos de tu pedido:</h1>
        </Col>
      </Row>
      <Row>
        <Col sm={8}>
          {
            !pedido.items.length ? <PedidoVacio /> : <PedidoCompleto />
          }
        </Col>
        <Col sm={4}>
          <div>
            <p>Subtotal ({pedido.items.length}) items</p>
            <p>$ {pedido.importe}</p>
          </div>
          <div className="d-grid gap-2">
            <Button variant="dark" size="lg">Proceder a la Compra</Button>
            <Button variant="warning" size="lg" onClick={() => handleVaciarPedido()}>Vaciar Pedido</Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Pedido;