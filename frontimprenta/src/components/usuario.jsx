import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

import UsuarioDataService from "../services/servicio-usuario.js";

const Usuario = props => {

    const estadoInicialUsuario = {
        _id: null,
        googleId: "",
        nombre: "",
        email: "",
        password: "",
        tipo: "cliente",
        direccion: {
            calle: "",
            numero: 0,
            localidad: "",
        },
        telefono: 0,
    };

    const [user, setUser] = useState(estadoInicialUsuario);
    const [validated, setValidated] = useState(false);
    const history = useHistory();

    //const cambiarTipoUsuario = () => setGoogleUser((prevGoogleUser) => !prevGoogleUser)

    const obtenerUsuario = async (email) => {

        //setUser(perfil.result);
        //console.log(user);

        //const email = perfil.result.email;
        /*
        UsuarioDataService.getUsuario(email)
            .then(response => {
                setUser(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log({ e });
            });*/
        try {
            const { data } = await UsuarioDataService.getUsuario(email);
            //console.log(data);
            setUser(data);
        } catch (error) {
            console.log(error);
        }

    };


    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleDireccionInputChange = (e) => {
        setUser({ ...user, direccion: { ...user.direccion, [e.target.name]: e.target.value } })
    }

    const handleSubmit = async (e) => {
        const form = e.currentTarget;
        //console.log(form);
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }
        else {
            setValidated(true);
            alert("Modificado!")
            /*
            try {
                //const token = props.usuario.token;
                const { data } = await UsuarioDataService.updateUsuario(user);

                if (data.status === "Sin cambios") {
                    alert("No se realizaron cambios.")
                }
                else {
                    localStorage.setItem('perfil', JSON.stringify(data))
                    history.push("/imprenta")
                }

            } catch (error) {
                console.log({ message: "No se pudo actualizar los datos.", error });
            }
            */
        }
    }


    useEffect(() => {
        //obtenerUsuario(props.match.params.id);
        obtenerUsuario(props.location.state.usuarioActual.result.email);
        //obtenerUsuario(JSON.parse(localStorage.getItem('perfil')));
    }, []);


    return (
        <Container>
            <Row>
                <Col></Col>
                <Col xs={6}><h4 className="display-4">Datos de Contacto: {user.nombre}</h4></Col>
                <Col></Col>
            </Row>
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3  p-2 bg-light border">
                            <Form.Label>Nombre completo:</Form.Label>
                            <Form.Control
                                type="text"
                                id="nombre"
                                required
                                value={user.nombre}
                                onChange={handleInputChange}
                                name="nombre"
                                placeholder="Nombre completo"
                                disabled={user.googleId === "No Tiene" ? false : true}
                            />
                            <Form.Control.Feedback type="invalid">
                                Ingrese su nombre!
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3  p-2 bg-light border">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                id="email"
                                required
                                value={user.email}
                                onChange={handleInputChange}
                                name="email"
                                placeholder="Dirección de Email"
                                disabled
                            />
                        </Form.Group>
                        <Row className="mb-3 p-2 bg-light border">
                            <Form.Label>Dirección:</Form.Label>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="text"
                                    id="calle"
                                    required
                                    value={user?.direccion.calle}
                                    onChange={handleDireccionInputChange}
                                    name="calle"
                                    placeholder="Calle"
                                />
                            </Form.Group>
                            <Form.Control.Feedback type="invalid">
                                Ingrese la calle de su dirección!
                            </Form.Control.Feedback>
                            <Form.Group as={Col}>
                                <Form.Control
                                    type="number"
                                    id="numero"
                                    required
                                    value={user?.direccion.numero === null ? '' : user?.direccion.numero}
                                    onChange={handleDireccionInputChange}
                                    name="numero"
                                    placeholder="Número"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 mt-3">
                                <Form.Control
                                    type="text"
                                    id="localidad"

                                    value={user?.direccion.localidad}
                                    onChange={handleDireccionInputChange}
                                    name="localidad"
                                    placeholder="Localidad"
                                />
                            </Form.Group>
                        </Row>
                        <Form.Group className="mb-3 p-2 bg-light border">
                            <Form.Label>Teléfono:</Form.Label>
                            <Form.Control
                                type="text"
                                id="telefono"
                                required
                                value={user.telefono === null ? '' : user.telefono}
                                onChange={handleInputChange}
                                name="telefono"
                                placeholder="Teléfono"
                            />
                        </Form.Group>
                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit">
                                Guardar
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Usuario;