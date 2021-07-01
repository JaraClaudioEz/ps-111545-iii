import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

import ItemPedido from "./item-pedido";
//import BotonMP from "./botonMP";
import OrdenDataService from "../services/servicio-orden.js";

const Pedido = ({ pedido, agregarAlPedido, handleQuitarItemPedido, handleVaciarPedido }) => {

  //const [nuevoPedido, setNuevoPedido] = useState(JSON.parse(localStorage.getItem('pedido')))
  const [preferenceId, setPreferenceId] = useState(null);

  const FORM_ID = 'payment-form';
  //VER setTimeout PARA EVITAR LA CARGA INMEDIATA
  /*
  // Agrega credenciales de SDK
  const mp = new window.MercadoPago('APP_USR-b5236fb8-dfaf-4bb1-bfe1-7f1e6e6e8dbe', {
    locale: 'es-AR'
  });

  // Inicializa el checkout
  mp.checkout({
    preference: {
      id: 'YOUR_PREFERENCE_ID'
    },
    render: {
      container: '.mercadopago', // Indica dónde se mostrará el botón de pago
      label: 'Proceder a la Compra', // Cambia el texto del botón de pago (opcional)
    }
  });
  */

  const PedidoVacio = () => (
    <h4>No tienes items en tu pedido. <Link to="/productos">Comienza a agregar!</Link></h4>
  );

  const PedidoCompleto = () => (
    <Col>
      {pedido.items.map((item) => (
        <Row key={item._id}>
          <ItemPedido item={item} alAgregarItemPedido={agregarAlPedido} alQuitarItemPedido={handleQuitarItemPedido} />
        </Row>
      ))}
    </Col>
  );

  const submitCheckout = async () => {
    try {
      const { data } = await OrdenDataService.checkout(pedido.idUsuario);
      console.log(data);
      setPreferenceId(data.preferenceId);
      window.location.href = data.checkoutURL;
    } catch (error) {
      console.log(error);
    }
  };
  /*
  const obtenerPreference = async () => {
    try {
      const { data } = await OrdenDataService.checkout(pedido.idUsuario);
      //console.log(data);
      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // luego de montarse el componente, le pedimos al backend el preferenceId
    obtenerPreference();
  }, []);
  
  useEffect(() => {
    if (preferenceId) {
      // con el preferenceId en mano, inyectamos el script de mercadoPago
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src =
        'https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js';
      script.dataset.preferenceId = preferenceId;
      const form = document.getElementById(FORM_ID);
      form.appendChild(script);
    }
  }, [preferenceId]);
  
  /*
  useEffect(() => {
    setNuevoPedido(pedido);
  }, [pedido]);
  */
  console.log(pedido);
  //if (!pedido) return 'Cargando...';


  return (
    <Container>
      {
        !pedido ? (
          <div>
            <Row>
              <Col>
                <h4 className="display-4">Lista productos de tu pedido:</h4>
              </Col>
            </Row>
            <Row>
              <Col sm={8}>
                <PedidoVacio />
              </Col>
              <Col sm={4}>
                <div>
                  <p>Subtotal (0) items:</p>
                  <p>$ 0</p>
                </div>
                <div className="d-grid gap-2">
                  <Button variant="dark" size="lg" disabled>Proceder a la Compra</Button>
                  <Button variant="warning" size="lg" disabled>Vaciar Pedido</Button>
                </div>
              </Col>
            </Row>
          </div>
        ) : (
          <div>
            <Row>
              <Col>
                <h4 className="display-4">Lista productos de tu pedido:</h4>
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
                  <p>Subtotal ({!pedido ? 0 : pedido.items.length}) items:</p>
                  <p>$ {!pedido ? 0 : pedido.importe}</p>
                </div>
                <div className="d-grid gap-2">
                  <Button variant="dark" size="lg" onClick={submitCheckout}>Proceder a la Compra</Button>
                  <Button variant="warning" size="lg" onClick={() => handleVaciarPedido()}>Vaciar Pedido</Button>
                  <form id={FORM_ID} method="GET" />
                </div>
              </Col>
            </Row>
          </div>

        )
      }

    </Container>
  );
}

export default Pedido;