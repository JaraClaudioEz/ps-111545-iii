import React, { useState } from 'react';
import { GoogleLogin } from 'react-google-login';

const Autorizacion = () => {

    const [mostrarPass, setMostrarPass] = useState(false);
    const [registrado, setRegistrado] = useState(false);

    const handleSubmit = () => {

    }

    const handleInputChange = () => {

    }

    const cambiarModo = () => {
        setRegistrado((prevRegistrado) => !prevRegistrado);
        handleMostrarPass(false);
    }

    const handleMostrarPass = () => setMostrarPass((prevMostrarPass) => !prevMostrarPass)

    const googleSuccess = async (res) => {
        //console.log(res);
        const resultado = res?.profileObj;
        const token = res?.tokenId;

        try {
            
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log("No se pudo iniciar sesión con Google");
    }

    return (
        <div className="container-fluid">
            <div className="row mx-auto">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="">
                        <h4>{registrado ? "Registrarse" : "Iniciar Sesión"}</h4>
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
                                                value=""
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
                                                value=""
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
                                    value=""
                                    onChange={handleInputChange}
                                    name="email"
                                    placeholder="Dirección de Email"
                                />
                            </div>
                            <div className="p-2 bg-light border">
                                <label className="form-label">Constraseña:</label>
                                <div className="input-group mb-3">
                                    <input
                                        type={mostrarPass ? "text" : "password"}
                                        className="form-control"
                                        id="password"
                                        required
                                        value=""
                                        onChange={handleInputChange}
                                        name="password"
                                        placeholder="Contraseña"
                                    />
                                    <button className="btn btn-outline-secondary" type="button" id="mostrarPass" onClick={handleMostrarPass}>Mostrar</button>
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
                                                value=""
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
                                    <button className="btn btn-primary" onClick={renderProps.onClick} >Iniciar Sesión con Google</button>
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