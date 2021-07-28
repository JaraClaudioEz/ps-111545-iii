import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';

import ProductoDataService from "../services/servicio-producto";
import logo from "../assets/IntegralLogo.png";

const Producto = ({ match, usuario, alAgregarAlPedido }) => {
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
  //console.log(usuario);
  const [producto, setProducto] = useState(estadoInicialProducto);
  const history = useHistory();

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

  const handleOnClick = () => {
    if (usuario !== null) {
      if (usuario?.result.tipo === "admin") {
        history.push(`/productos/agregar/${producto._id}`)
      }
      else {
        alAgregarAlPedido(producto._id, 1)
        alert("Producto agregado con éxito!")
      }
    }
    else {
      alert("Debes iniciar sesión!");
      history.push("/autorizacion")
    }
  };

  useEffect(() => {
    obtenerProducto(match.params.id);
  }, [match.params.id]);

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
            {usuario?.result.tipo === "admin" ? (
              <Link to={{ pathname: "/productos/agregar/" + producto._id, state: { productoActual: producto } }} className="btn btn-success">Editar</Link>
            ) : (
              <Button
                variant="dark"
                onClick={() => handleOnClick()}
              >
                Agregar al Pedido
              </Button>
            )}
          </Col>
        </Row>
        <Row>
          <Col>
            <h4> {producto.descripcion} </h4>
            <Link to={"/productos"} className="btn btn-primary">
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