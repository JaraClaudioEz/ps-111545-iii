import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Container, Row, Col, Button, Image, Badge } from 'react-bootstrap';

import ProductoDataService from "../services/servicio-producto";
import logo from "../assets/integral.png";

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
      <div className="landing">
        <Container className="py-5" >
          <Row>
            <Col sm={6} className="px-3">
              <Image src={producto?.imagen.url === "" ? logo : producto.imagen.url} alt="Logo" rounded className="card-img-top" fluid />
            </Col>
            <Col sm={6}>
              <Col className="pb-2">
                <h4>
                  {producto.nombre_producto}
                  {producto.oferta && (<Badge bg="success" className="m-2">En Oferta!!</Badge>)}
                </h4>
                <p> {producto.descripcion} </p>
                <h6 className="mb-4">
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span className="text-muted text-decoration-line-through" hidden={!producto.oferta}>${producto.precio}</span><br />
                  <strong>Precio: </strong>${producto.oferta ? (producto.precio_oferta) : (producto.precio)} por {producto.provision}<br />
                  <strong>Características: </strong>{producto.especificaciones}
                </h6>
                {usuario?.result.tipo === "admin" ? (
                  <div className="d-grid gap-2 my-2">
                    <Link to={{ pathname: "/productos/agregar/" + producto._id, state: { productoActual: producto } }} className="btn btn-success">Editar</Link>
                  </div>
                ) : (
                  <div className="d-grid gap-2 my-2">
                    <Button
                      variant="light"
                      onClick={() => handleOnClick()}
                    >
                      Agregar al Pedido
                    </Button>
                  </div>
                )}
              </Col>
              <Col className="d-grid gap-2">
                <Link to={"/productos"} className="btn btn-primary">
                  Volver
                </Link>
              </Col>
            </Col>

          </Row>
          <Row className="py-3">

            <Col>

            </Col>
          </Row>
        </Container >
      </div>
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