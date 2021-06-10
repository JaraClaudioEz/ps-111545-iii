import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

import UsuarioDataService from "../services/servicio-usuario.js";

const Usuario = props => {

    const estadoInicialUsuario = {
        _id: null,
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        tipo: "cliente",
        direccion: {
            calle: "",
            numero: 0,
            localidad: ""
        },
        telefono: 0
    };

    const estadoInicialUsuarioGoogle = {
        _id: null,
        nombre: "",
        apellido: "",
        email: "",
        password: "",
        tipo: "cliente",
        direccion: {
            calle: "",
            numero: 0,
            localidad: ""
        },
        telefono: 0
    };

    const [user, setUser] = useState(estadoInicialUsuario);
    //const [user, setUser] = useState(props.usuario);
    //const [googleUser, setGoogleUser] = useState(estadoInicialUsuario);
    const [googleUser, setGoogleUser] = useState(false);
    const history = useHistory();

    //const cambiarTipoUsuario = () => setGoogleUser((prevGoogleUser) => !prevGoogleUser)

    const verificarTipoUsuario = () =>  {
        if(props.usuario.result.googleId){
            return true;
        }
        return false;
    }

    const handleInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (user.result.googleId) setGoogleUser(true);

        if (googleUser) {
            /*
            try {
                const { data } = await UsuarioDataService.signUpUsuario(usuario);
                console.log(data);
                localStorage.setItem('perfil', JSON.stringify(data))
                history.push("/imprenta")
            } catch (error) {
                console.log({ message: "No se pudo registrar nuevo usuario", error });
            }
            */
        }
        else {

            try {
                const { data } = await UsuarioDataService.updateUsuario(user);
                console.log(data);
                localStorage.setItem('perfil', JSON.stringify(data))
                history.push("/imprenta")
            } catch (error) {
                console.log({ message: "No se pudo actualizar los datos.", error });
            }
        }

    }
    
    useEffect(() => {
        setUser(props.usuario);
    }, []);
    

    return (
        <div className="container-fluid">
            <div className="row mx-auto">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="">
                        <h4>Datos de Contacto: {"googleId" in user ? user.result.name : user.result.nombre}</h4>
                    </div>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className="d-grid gap-3">

                            <div className="d-grid gap-3">
                                <div className="p-2 bg-light border">
                                    <label className="form-label">Nombre completo:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombre"
                                        required
                                        value={"googleId" in user ? user.result.name : user.result.nombre}
                                        onChange={handleInputChange}
                                        name="nombre"
                                        placeholder="Nombre completo"
                                        disabled={"googleId" in user ? true : false}
                                    />
                                </div>
                            </div>
                            <div className="p-2 bg-light border">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={user.result.email}
                                    onChange={handleInputChange}
                                    name="email"
                                    placeholder="Dirección de Email"
                                    disabled
                                />
                            </div>
                            <div className="d-grid gap-3">
                                <div className="row p-2 bg-light border">
                                    <label className="form-label">Dirección:</label>
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="calle"
                                            required
                                            value={"googleId" in user ? "" : user.result.direccion.calle}
                                            onChange={handleInputChange}
                                            name="calle"
                                            placeholder="Calle"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="numero"
                                            required
                                            value={"googleId" in user ? "" : user.result.direccion.numero}
                                            onChange={handleInputChange}
                                            name="numero"
                                            placeholder="Número"
                                        />
                                    </div>
                                </div>
                                <div className="row p-2 bg-light border">
                                    <div className="col-md-12">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="localidad"
                                            required
                                            value={"googleId" in user ? "" : user.result.direccion.localidad}
                                            onChange={handleInputChange}
                                            name="localidad"
                                            placeholder="Localidad"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="d-grid gap-3">
                                <div className="p-2 bg-light border">
                                    <label className="form-label">Teléfono:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="telefono"
                                        required
                                        value={"googleId" in user ? "" : user.result.telefono}
                                        onChange={handleInputChange}
                                        name="telefono"
                                        placeholder="Teléfono"

                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Actualizar mis Datos
                            </button>
                        </div>


                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>

        </div>
    );
};

export default Usuario;