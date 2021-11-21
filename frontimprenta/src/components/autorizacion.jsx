import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory, Link } from 'react-router-dom';
import { Alert, Container, Col, Row, Form, Button, Image } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';

import UsuarioDataService from "../services/servicio-usuario.js";
import google from "../assets/google.png"

const Autorizacion = () => {

    const estadoInicialUsuario = {
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        confirmPass: "",
    };

    const [usuario, setUsuario] = useState(estadoInicialUsuario);
    const [avisoVerif, setAvisoVerif] = useState(false);
    const [registrado, setRegistrado] = useState(false);
    const history = useHistory();

    const validar = registrado ?
        yup.object({
            nombre: yup.string()
                .min(3, 'Tienes un nombre demasiado corto no?')
                .max(25, 'Debe ser de 25 caracteres o menos.')
                .required('Completa este campo.'),
            apellido: yup.string()
                .min(3, 'Tu Apellido tiene dos caracteres?')
                .max(25, 'Debe ser de 25 caracteres o menos.')
                .required('Completa este campo.'),
            email: yup.string()
                .email('Email inválido!')
                .required('Una dirección de email es requerida.'),
            password: yup.string()
                .min(8, 'La contraseña debe ser de al menos 8 caracteres.')
                .max(16, 'La contraseña no puede superar los 16 caracteres.')
                .required('Una contraseña es requerida.'),
            confirmPass: yup.string()
                .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir!')
                .required('Debes confirmar la contraseña ingresada.'),
            terms: yup.bool().required().oneOf([true], 'Debe aceptar antes de registrarse.'),
        }) : yup.object({
            email: yup.string()
                .email('Email inválido!')
                .required('Una dirección de email es requerida.'),
            password: yup.string()
                .required('Una contraseña es requerida.'),
        });

    const iniciar = async (user) => {
        //e.preventDefault();

        //console.log(user);

        if (registrado) {

            try {
                const { data } = await UsuarioDataService.signUpUsuario(user);
                console.log(data);
                if (data.status) {
                    setAvisoVerif(true);
                } else {
                    alert("Oh no! Algo anduvo mal al enviar email de verificacion.")
                }
                //localStorage.setItem('perfil', JSON.stringify(data))
                //history.push("/imprenta")

            } catch (error) {
                if (error.response.status === 400) {
                    alert("El email utilizado ya se encuentra registrado!")
                }
                console.log({ message: "No se pudo registrar nuevo usuario", error });
            }
        }
        else {

            try {
                const { data } = await UsuarioDataService.signInUsuario(user);
                //console.log(data);
                if (data.result.verificado) {
                    localStorage.setItem('perfil', JSON.stringify(data))
                    history.push("/imprenta")
                } else {
                    alert("Tu email no ha sido verificado! Por favor verifica tu email.")
                }

            } catch (error) {
                alert("Error al iniciar sesion, verifique sus credenciales");
            }
        }

    }

    /*
    const handleInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }
    */

    const cambiarModo = () => {
        setRegistrado((prevRegistrado) => !prevRegistrado);
        //handleMostrarPass(true);
    }

    //const handleMostrarPass = () => setMostrarPass((prevMostrarPass) => !prevMostrarPass)
    //<button className="btn btn-outline-secondary" type="button" id="mostrarPass" onClick={handleMostrarPass}>Mostrar</button>

    const googleSuccess = async (res) => {

        let result = res?.profileObj;
        const token = res?.tokenId;

        const user = {
            googleId: result.googleId,
            nombre: result.name,
            email: result.email,
        };

        try {

            if (registrado) {

                const res = await UsuarioDataService.saveUsuarioGoogle(user);
                //console.log(res);
            }

            localStorage.setItem('perfil', JSON.stringify({ result, token }))

            const { data } = await UsuarioDataService.getUsuario(result.email)
            result = data;

            localStorage.setItem('perfil', JSON.stringify({ result, token }))
            //console.log(data);
            history.push('/imprenta')

        } catch (error) {
            if (error.response.status === 400) {
                alert("El email utilizado ya se encuentra registrado!")
            }
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        //console.log("No se pudo iniciar sesión con Google", error);
        alert("No se pudo iniciar sesión con Google");
    }

    return (
        <Formik
            validationSchema={validar}
            enableReinitialize={true}
            initialValues={{
                nombre: '',
                apellido: '',
                email: '',
                password: '',
                confirmPass: '',
                terms: false,
            }}
            onSubmit={values => {

                const user = {
                    ...usuario,
                    nombre: values.nombre,
                    apellido: values.apellido,
                    email: values.email,
                    password: values.password,
                    confirmPass: values.confirmPass
                }
                iniciar(user);
                //console.log(user);
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
                <Container className="landing" fluid>

                    <Row className="py-2">
                        <Col></Col>
                        <Col xs={6}><h4 className="display-4">{registrado ? "Registrarse" : "Iniciar Sesión"}</h4></Col>
                        <Col></Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                            <Alert variant="info" show={avisoVerif} dismissible>
                                <Alert.Heading>Completa tu registro!</Alert.Heading>
                                <p>
                                    Para completar tu registro te enviamos un email a
                                    la dirección de correo ingresada. Sigue el link en
                                    mismo e inicia sesión con tu cuenta.
                                </p>
                            </Alert>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ span: 6, offset: 3 }}>
                            <Form noValidate onSubmit={handleSubmit}>
                                {
                                    registrado && (
                                        <div>
                                            <Form.Group className="mb-1 p-2">
                                                <Form.Label>Nombre:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="nombre"
                                                    required
                                                    value={values.nombre}
                                                    onChange={handleChange}
                                                    name="nombre"
                                                    placeholder="Nombre"
                                                    isValid={touched.nombre && !errors.nombre}
                                                    isInvalid={!!errors.nombre}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.nombre}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Form.Group className="mb-1 p-2">
                                                <Form.Label>Apellido:</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    id="apellido"
                                                    required
                                                    value={values.apellido}
                                                    onChange={handleChange}
                                                    name="apellido"
                                                    placeholder="Apellido"
                                                    isValid={touched.apellido && !errors.apellido}
                                                    isInvalid={!!errors.apellido}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.apellido}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </div>
                                    )
                                }

                                <Form.Group className="mb-1 p-2">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        id="email"
                                        required
                                        value={values.email}
                                        onChange={handleChange}
                                        name="email"
                                        placeholder="Dirección de Email"
                                        isValid={touched.email && !errors.email}
                                        isInvalid={!!errors.email}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-1 p-2">
                                    <Form.Label>Contraseña:</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="password"
                                        required
                                        value={values.password}
                                        onChange={handleChange}
                                        name="password"
                                        placeholder="Contraseña"
                                        isValid={touched.password && !errors.password}
                                        isInvalid={!!errors.password}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Parece una buena contraseña!</Form.Control.Feedback>
                                    {
                                        registrado && (
                                            <span id="ayudaPass" className="form-text">
                                                Debe contener entre 8-16 caracteres.
                                            </span>
                                        )
                                    }
                                </Form.Group>
                                {
                                    registrado && (
                                        <div>
                                            <Form.Group className="mb-1 p-2">
                                                <Form.Label>Confirmar contraseña:</Form.Label>
                                                <Form.Control
                                                    type="password"
                                                    id="confirmPass"
                                                    required
                                                    value={values.confirmPass}
                                                    onChange={handleChange}
                                                    name="confirmPass"
                                                    placeholder="Repetir contraseña"
                                                    isValid={touched.confirmPass && !errors.confirmPass}
                                                    isInvalid={!!errors.confirmPass}
                                                />
                                                <Form.Control.Feedback type="invalid">
                                                    {errors.confirmPass}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                            <Row>
                                                <Col md="auto">
                                                    <Form.Group className="mb-2 px-2">
                                                        <Form.Check
                                                            required
                                                            name="terms"
                                                            label="Aceptar Términos y Condiciones"
                                                            onChange={handleChange}
                                                            isInvalid={!!errors.terms}
                                                            feedback={errors.terms}
                                                            feedbackType="invalid"
                                                            id="validationFormik0"
                                                        />
                                                    </Form.Group>

                                                </Col>
                                                <Col md="auto" className="mb-3 px-0">
                                                    <Link to="/legales">Ver aquí...</Link>
                                                </Col>
                                            </Row>

                                        </div>
                                    )
                                }

                                <div className="d-grid gap-2 px-2 mt-2">
                                    <Button variant="primary" type="submit">
                                        {registrado ? "Registrarse" : "Iniciar Sesión"}
                                    </Button>
                                    <GoogleLogin
                                        clientId="849202159020-cc8hh5juek0gbur3mglf240sg8j4em6f.apps.googleusercontent.com"
                                        render={(renderProps) => (
                                            <button className="btn btn-light" onClick={renderProps.onClick} >
                                                {registrado ? (
                                                    <Col>
                                                        <span><Image src={google} alt='Google' className="pr-2" style={{ height: '36px' }}/>  Registrarse con Google</span>
                                                    </Col>
                                                ) : (
                                                    <Col>
                                                        <span><Image src={google} alt='Google' className="pr-2" style={{ height: '36px' }}/>  Iniciar Sesión con Google</span>
                                                    </Col>
                                                )}
                                            </button>
                                        )}
                                        onSuccess={googleSuccess}
                                        onFailure={googleFailure}
                                        cookiePolicy="single_host_origin"
                                    />
                                </div>
                                <div className="d-grid d-flex justify-content-end mb-4">
                                    <button type="button" className="btn btn-link" onClick={cambiarModo}>
                                        {registrado ? "Ya tiene cuenta? Inicie sesión." : "No tiene cuenta? Registrarse."}
                                    </button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            )
            }
        </Formik >
    );
}

export default Autorizacion