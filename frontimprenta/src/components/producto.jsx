import React, { useState, useEffect } from "react";
import ProductoDataService from "../services/servicio-producto";
import { Link } from "react-router-dom";

import logo from "../assets/IntegralLogo.png";

const Producto = props => {
  const estadoInicialProducto = {
    _id: null,
    nombre: "",
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
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    obtenerProducto(props.match.params.id);
  }, [props.match.params.id]);


  return (
    <div>
      {producto ? (
        <div className="container-fluid">
          <div className="container">
            <img src={producto?.imagen.url == "" ? logo : producto.imagen.url} className="card-img-top" alt="logo" />
          </div>
          <div className="container">
            <h5>{producto.nombre}</h5>
            <p>
              <strong>Especificaciones: </strong>{producto.especificaciones}<br />
              <strong>Descripción: </strong>{producto.descripcion}
            </p>
            <Link to={"/imprenta"} className="btn btn-primary">
              Volver
            </Link>
            <h4> Características </h4>
          </div>
          <div className="row">
            {props.user ?
              <div className="col-lg-4 pb-1">
                <p>Vista Admin.</p>
              </div>
              : (
                <div className="col-sm-4">
                  <p>Vista Cliente.</p>
                </div>
              )}
          </div>
        </div>
      ) : (
        <div>
          <br />
          <p>No hay producto seleccionado.</p>
        </div>
      )}
    </div>
  );
}

export default Producto;