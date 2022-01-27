import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2'
import es from 'react-phone-input-2/lang/es.json'
import 'react-phone-input-2/lib/style.css'

import UsuarioDataService from "../services/servicio-usuario.js";
import AccessDenied from "../components/403.jsx";

const Usuario = props => {

    const validar = yup.object({
        nombre: yup.string()
            .max(50, 'Supera el limite de caracteres.')
            .required('Completa este campo.'),
        calle: yup.string()
            .max(50, 'Supera el limite de caracteres.')
            .required('Completa este campo.'),
        numero: yup.number()
            .max(9999, 'Verifiva el numero')
            .required('Completa este campo.')
            .positive('Solo valores positivos')
            .integer(),
        localidad: yup.string()
            .max(30, 'Supera el limite de caracteres.')
            .required('Completa este campo.'),
        /*
        telefono: yup.number()
            .max(99999999999, 'Numero de telefono no valido')
            .required('Completa este campo.'),
        */
    });

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
    const [phone, setPhone] = useState("");
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

    const guardarCambios = async (updated) => {
        //e.preventDefault();
        console.log(updated);

        try {
            //const token = props.usuario.token;
            const { data } = await UsuarioDataService.updateUsuario(updated);

            if (data.status === "Sin cambios") {
                alert("No se realizaron cambios.")
            }
            else {
                localStorage.setItem('perfil', JSON.stringify(data))
                alert("Modificado!")
                history.push("/imprenta")
            }

        } catch (error) {
            console.log({ message: "No se pudo actualizar los datos.", error });
        }

    }

    const handleTelChange = (e) => {
        setPhone(e)
    }


    useEffect(() => {
        
        obtenerUsuario(props.location.state.usuarioActual.result.email);
        
    }, []);

    useEffect(() => {
        setPhone(user.telefono)
    }, [user]);


    return (
        <div>
            {user ? (
                <Formik
                    validationSchema={validar}
                    enableReinitialize={true}
                    initialValues={{
                        nombre: user.nombre ? user.nombre : "",
                        calle: user.direccion.calle ? user.direccion.calle : "",
                        numero: user.direccion.numero ? user.direccion.numero : 0,
                        localidad: user.direccion.localidad ? user.direccion.localidad : "",
                        telefono: user?.telefono ? user.telefono : 0,
                    }}
                    onSubmit={values => {

                        const updatedUser = {
                            ...user,
                            nombre: values.nombre,
                            telefono: phone,
                            direccion: {
                                ...user.direccion,
                                calle: values.calle,
                                numero: values.numero,
                                localidad: values.localidad
                            },
                        }
                        guardarCambios(updatedUser);
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
                        <Container className="px-0" fluid>

                            <Row className="head py-2 mx-0">
                                <Col></Col>
                                <Col xs={6} style={{ color: "cornsilk" }}><h4 className="display-4 px-0">Datos de Contacto: {user.nombre}</h4></Col>
                                <Col></Col>
                            </Row>
                            <Row className="landing py-4 mx-0">
                                <Col md={{ span: 6, offset: 3 }} className="px-0">
                                    <Form noValidate onSubmit={handleSubmit}>
                                        <Form.Group className="mb-3 p-2">
                                            <Form.Label>Nombre completo:</Form.Label>
                                            <Form.Control
                                                type="text"
                                                id="nombre"
                                                required
                                                value={values.nombre}
                                                onChange={handleChange}
                                                name="nombre"
                                                placeholder="Nombre completo"
                                                disabled={user?.googleId === "No Tiene" ? false : true}
                                                isValid={touched.nombre && !errors.nombre}
                                                isInvalid={!!errors.nombre}
                                                style={{ color: '#333' }}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.nombre}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3 p-2">
                                            <Form.Label>Email:</Form.Label>
                                            <Form.Control
                                                type="email"
                                                id="email"
                                                required
                                                value={user?.email}
                                                name="email"
                                                placeholder="Dirección de Email"
                                                disabled
                                                style={{ color: '#333' }}
                                            />
                                        </Form.Group>
                                        <Row className="mb-3 p-2">
                                            <Form.Label>Dirección:</Form.Label>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    type="text"
                                                    id="calle"
                                                    required
                                                    value={values?.calle}
                                                    onChange={handleChange}
                                                    name="calle"
                                                    placeholder="Calle"
                                                    isValid={touched.calle && !errors.calle}
                                                    isInvalid={!!errors.calle}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.calle}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Control.Feedback type="invalid">
                                                Ingrese la calle de su dirección!
                                            </Form.Control.Feedback>
                                            <Form.Group as={Col}>
                                                <Form.Control
                                                    type="number"
                                                    id="numero"
                                                    required
                                                    value={values?.numero === null ? '' : values?.numero}
                                                    onChange={handleChange}
                                                    name="numero"
                                                    placeholder="Número"
                                                    isValid={touched.numero && !errors.numero}
                                                    isInvalid={!!errors.numero}
                                                    min='0'
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.numero}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-3 mt-3">
                                                <Form.Control
                                                    type="text"
                                                    id="localidad"

                                                    value={values?.localidad}
                                                    onChange={handleChange}
                                                    name="localidad"
                                                    placeholder="Localidad"
                                                    isValid={touched.localidad && !errors.localidad}
                                                    isInvalid={!!errors.localidad}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.localidad}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Row>

                                        <Form.Group className="mb-3 p-2">
                                            <Form.Label>Teléfono: </Form.Label>
                                            <PhoneInput
                                                country='ar'
                                                localization={es}
                                                placeholder="Ingrese un número de teléfono"
                                                value={!phone ? "" : phone}
                                                onChange={handleTelChange}
                                                disableDropdown
                                                onlyCountries={['ar']}
                                                masks={{ ar: '(....) ..-....' }}
                                                type='text'
                                                inputStyle={{ color: '#333' }}
                                                buttonStyle={{ backgroundColor: '#000000' }}

                                            />
                                        </Form.Group>

                                        <div className="d-grid gap-2 py-2">
                                            <Button variant="primary" type="submit">
                                                Guardar
                                            </Button>
                                        </div>
                                        <div className="d-grid gap-2 py-2">
                                            <Button variant="danger" href="/">
                                                Cancelar
                                            </Button>
                                        </div>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    )
                    }
                </Formik >
            ) : (
                <AccessDenied />
            )}
        </div>
    );
};

export default Usuario;