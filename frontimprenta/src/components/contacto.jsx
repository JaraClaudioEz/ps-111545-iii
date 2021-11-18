import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import UsuarioDataService from "../services/servicio-usuario.js";

const Contacto = () => {

    const validar = yup.object({
        email: yup.string()
            .email('Email inválido!')
            .required('Una dirección de email es requerida.'),
        asunto: yup.string()
            .max(50, 'Supera el limite de caracteres.')
            .required('Completa este campo.'),
        texto: yup.string()
            .max(500, 'Tu mensaje es demasiado largo, por favor resume tu consulta.')
            .required('Completa este campo.'),
    });

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

    const sendMensaje = async (msj) => {
        //e.preventDefault();
        //console.log(msj);

        try {

            const { data } = await UsuarioDataService.contacto(msj);
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
        <Formik
            validationSchema={validar}
            enableReinitialize={true}
            initialValues={{
                email: "",
                asunto: "",
                texto: "",
            }}
            onSubmit={values => {

                const nuevoMensaje = {
                    ...mensaje,
                    email: values.email,
                    asunto: values.asunto,
                    texto: values.texto
                }
                sendMensaje(nuevoMensaje);
            }}
        >
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <Container className="landing py-2" fluid>
                    <Row className="my-2">
                        <Col></Col>
                        <Col xs={6}><h4 className="display-4">Contacto: </h4></Col>
                        <Col></Col>
                    </Row>
                    <Row className="my-4">
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Dirección de Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        required
                                        value={values.email}
                                        onChange={handleChange}
                                        name="email"
                                        placeholder="Ingrese su email."
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Asunto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="asunto"
                                        required
                                        value={values.asunto}
                                        onChange={handleChange}
                                        name="asunto"
                                        placeholder="Ingrese un asunto."
                                        isValid={touched.asunto && !errors.asunto}
                                        isInvalid={!!errors.asunto}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.asunto}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Mensaje</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        id="texto"
                                        value={values.texto}
                                        onChange={handleChange}
                                        name="texto"
                                        placeholder="Dejanos tu comentario..."
                                        isValid={touched.texto && !errors.texto}
                                        isInvalid={!!errors.texto}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.texto}
                                    </Form.Control.Feedback>
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
            )}
        </Formik >
    );
};

export default Contacto;