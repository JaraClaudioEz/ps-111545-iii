import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

import ProductoDataService from "../services/servicio-producto";
import logo from "../assets/IntegralLogo.png";

const Producto = props => {
  const estadoInicialProducto = {
    _id: null,
    nombre_producto: "",
    descripcion: "",
    especificaciones: "",
    provision: "",
    categoria: "",
    precio: 0,
    oferta: false,
    precio_oferta: 0,
    imagen: {
      url: "",
      id: ""
    }
  };

  const [producto, setProducto] = useState(estadoInicialProducto);

  const obtenerProducto = id => {
    ProductoDataService.getProducto(id)
      .then(response => {
        setProducto(response.data);
        //console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    obtenerProducto(props.match.params.id);
  }, [props.match.params.id]);


  return (

    producto ? (
      <Container>
        <Row>
          <Col sm={8}>
            <img src={producto?.imagen.url === "" ? logo : producto.imagen.url} className="card-img-top" alt="logo" />
          </Col>
          <Col sm={4}>
            <h5>{producto.nombre_producto}</h5>
            <p>
              <strong>Precio: </strong>${producto.precio} por {producto.provision}<br />
              <strong>Características: </strong>{producto.especificaciones}
            </p>
            <Button variant="dark">Agregar al Pedido</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4> {producto.descripcion} </h4>
            <Link to={"/imprenta"} className="btn btn-primary">
              Volver
            </Link>
          </Col>
          <Col>
            
          </Col>
        </Row>
      </Container >
    ) : (
      <Container>
        <Row>
          <br />
          <p>No hay producto seleccionado.</p>
        </Row>
      </Container >
    )

  );
}

export default Producto;