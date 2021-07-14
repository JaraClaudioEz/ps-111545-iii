import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

import UsuarioDataService from "../services/servicio-usuario.js";

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (registrado) {

            try {
                const { data } = await UsuarioDataService.signUpUsuario(usuario);
                console.log(data);
                if (data.status) {
                    setAvisoVerif(true);
                } else {
                    alert("Oh no! Algo anduvo mal al enviar email de verificacion.")
                }
                //localStorage.setItem('perfil', JSON.stringify(data))
                //history.push("/imprenta")

            } catch (error) {
                console.log({ message: "No se pudo registrar nuevo usuario", error });
            }
        }
        else {

            try {
                const { data } = await UsuarioDataService.signInUsuario(usuario);
                //console.log(data);
                if (data.result.verificado) {
                    localStorage.setItem('perfil', JSON.stringify(data))
                    history.push("/imprenta")
                } else {
                    alert("Tu email no ha sido verificado! Por favor verifica tu email.")
                }

            } catch (error) {
                console.log({ message: "Error al iniciar sesion, verifique sus credenciales", error });
            }
        }
    }

    const handleInputChange = (e) => {
        setUsuario({ ...usuario, [e.target.name]: e.target.value })
    }

    const cambiarModo = () => {
        setRegistrado((prevRegistrado) => !prevRegistrado);
        //handleMostrarPass(true);
    }

    //const handleMostrarPass = () => setMostrarPass((prevMostrarPass) => !prevMostrarPass)
    //<button className="btn btn-outline-secondary" type="button" id="mostrarPass" onClick={handleMostrarPass}>Mostrar</button>

    const googleSuccess = async (res) => {

        let result = res?.profileObj;
        const token = res?.tokenId;

        const data = {
            googleId: result.googleId,
            nombre: result.name,
            email: result.email,
        };


        try {

            if (registrado) {
                //console.log(data);
                await UsuarioDataService.saveUsuarioGoogle(data);
                //console.log(estado);
            }

            localStorage.setItem('perfil', JSON.stringify({ result, token }))

            const { data } = await UsuarioDataService.getUsuario(result.email)
            result = data;

            localStorage.setItem('perfil', JSON.stringify({ result, token }))
            //console.log(data);
            history.push('/imprenta')

        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log("No se pudo iniciar sesión con Google", error);
        alert("No se pudo iniciar sesión con Google");
    }

    return (
        <div className="container-fluid">
            <div className="row mx-auto">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="">
                        <h4 className="display-4">{registrado ? "Registrarse" : "Iniciar Sesión"}</h4>
                    </div>
                    <div>
                        <Alert variant="info" show={avisoVerif} dismissible>
                            <Alert.Heading>Completa tu registro!</Alert.Heading>
                            <p>
                                Para completar tu registro te enviamos un email a
                                la dirección de correo ingresada. Sigue el link en
                                mismo e inicia sesión con tu cuenta.
                            </p>
                        </Alert>
                    </div>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className="d-grid gap-3">
                            {
                                registrado && (
                                    <div className="d-grid gap-3">
                                        <div className="p-2 bg-light border">
                                            <label className="form-label">Nombre:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nombre"
                                                required
                                                value={usuario.nombre}
                                                onChange={handleInputChange}
                                                name="nombre"
                                                placeholder="Nombre"
                                            />
                                        </div>
                                        <div className="p-2 bg-light border">
                                            <label className="form-label">Apellido:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="apellido"
                                                required
                                                value={usuario.apellido}
                                                onChange={handleInputChange}
                                                name="apellido"
                                                placeholder="Apellido"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                            <div className="p-2 bg-light border">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={usuario.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    placeholder="Dirección de Email"
                                />
                            </div>
                            <div className="p-2 bg-light border">
                                <label className="form-label">Constraseña:</label>
                                <div className="input-group mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        required
                                        value={usuario.password}
                                        onChange={handleInputChange}
                                        name="password"
                                        placeholder="Contraseña"
                                    />

                                </div>
                                {
                                    registrado && (
                                        <span id="ayudaPass" className="form-text">
                                            Debe contener entre 8-20 caracteres.
                                        </span>
                                    )
                                }
                            </div>
                            {
                                registrado && (
                                    <div className="p-2 bg-light border">
                                        <label className="form-label">Repetir Constraseña:</label>
                                        <div className="input-group mb-3">
                                            <input
                                                type="password"
                                                className="form-control"
                                                id="confirmPass"
                                                required
                                                value={usuario.confirmPass}
                                                onChange={handleInputChange}
                                                name="confirmPass"
                                                placeholder="Repetir contraseña"
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="d-grid gap-2">
                            <button type="submit" className="btn btn-primary">
                                {registrado ? "Registrarse" : "Iniciar Sesión"}
                            </button>
                            <GoogleLogin
                                clientId="849202159020-cc8hh5juek0gbur3mglf240sg8j4em6f.apps.googleusercontent.com"
                                render={(renderProps) => (
                                    <button className="btn btn-primary" onClick={renderProps.onClick} >
                                        {registrado ? "Registrarse con Google" : "Iniciar Sesión con Google"}
                                    </button>
                                )}
                                onSuccess={googleSuccess}
                                onFailure={googleFailure}
                                cookiePolicy="single_host_origin"
                            />
                        </div>
                        <div className="d-grid d-flex justify-content-end">
                            <button type="button" className="btn btn-link" onClick={cambiarModo}>
                                {registrado ? "Ya tiene cuenta? Inicie sesión." : "No tiene cuenta? Registrarse."}
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>

        </div>
    );
}

export default Autorizacion