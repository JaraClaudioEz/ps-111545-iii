import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import UsuarioDataService from "../services/servicio-usuario.js";

const Contacto = () => {

    const estadoInicialMensaje = {
        email: "",
        asunto: "",
        texto: "",
    };

    const [mensaje, setMensaje] = useState(estadoInicialMensaje)
    const history = useHistory();

    const handleInputChange = (e) => {
        setMensaje({ ...mensaje, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const { data } = await UsuarioDataService.contacto(mensaje);
            console.log(data);
            if (data.status === 'empty') {
                alert("No se realizó consulta: no hay comentario.")
            }
            if (data.status === 'enviado') {
                alert("Recibimos tu consulta!")
                history.push('/');
            }


        } catch (error) {
            console.log({ message: "Algo anduvo mal al enviar consulta.", error });
        }

    }

    return (

        <Container>
            <Row>
                <Col></Col>
                <Col xs={6}><h4 className="display-4">Contacto: </h4></Col>
                <Col></Col>
            </Row>
            <Row>

                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Dirección de Email</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                required
                                value={mensaje.email}
                                onChange={handleInputChange}
                                name="email"
                                placeholder="Ingrese su email." />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Asunto</Form.Label>
                            <Form.Control
                                type="text"
                                id="asunto"
                                required
                                value={mensaje.asunto}
                                onChange={handleInputChange}
                                name="asunto"
                                placeholder="Ingrese un asunto." />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control
                                as="textarea"
                                id="texto"
                                value={mensaje.texto}
                                onChange={handleInputChange}
                                name="texto"
                                placeholder="Escríbenos tu comentario..." />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" size="lg" type="submit">
                                Enviar
                            </Button>
                        </div>
                    </Form>
                </Col>

            </Row>
        </Container>

    );
};

export default Contacto;