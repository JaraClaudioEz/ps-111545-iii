import React from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Image, Button } from 'react-bootstrap';

import logo from "../assets/ColibriLogo.png";

const ItemPedido = ({ item }) => {

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
                <Button variant="outline-secondary" size="sm">-</Button>
            </Col>
            <Col sm="auto">
                <p>{item.cantidad}</p>
            </Col>
            <Col sm="auto">
                <Button variant="outline-secondary" size="sm">+</Button>
            </Col>
            <Col sm>
                <Button>Quitar</Button>
            </Col>

        </Row>
    );
};

export default ItemPedido;