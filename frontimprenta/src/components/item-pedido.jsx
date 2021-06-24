import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Image, Button } from 'react-bootstrap';

import logo from "../assets/ColibriLogo.png";

const ItemPedido = ({ item, alAgregarItemPedido, alQuitarItemPedido }) => {

    return (
        <Row className="align-items-center">
            <Col sm><Image
                src={logo}
                width="50"
                height="30"
                fluid
                thumbnail /></Col>
            <Col sm>
                <Link to={"/productos/" + item.idProducto} className="btn">
                    <p>{item.nombre}</p>
                </Link>
            </Col>
            <Col sm>
                <p>${item.precio}</p>
            </Col>
            <Col sm="auto">
                <Button variant="outline-secondary" size="sm" onClick={() => item.cantidad>1 ? alAgregarItemPedido(item.idProducto, -1) : alQuitarItemPedido(item._id)}>-</Button>
            </Col>
            <Col sm="auto">
                <p>{item.cantidad}</p>
            </Col>
            <Col sm="auto">
                <Button variant="outline-secondary" size="sm" onClick={() => alAgregarItemPedido(item.idProducto, 1)}>+</Button>
            </Col>
            <Col sm>
                <Button onClick={() => alQuitarItemPedido(item._id)}>Quitar</Button>
            </Col>

        </Row>
    );
};

export default ItemPedido;