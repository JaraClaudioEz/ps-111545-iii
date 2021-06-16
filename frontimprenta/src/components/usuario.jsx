import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';

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
    //const [googleUser, setGoogleUser] = useState(false);
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
        e.preventDefault();

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

    }

    
    useEffect(() => {
        //obtenerUsuario(props.match.params.id);
        obtenerUsuario(props.location.state.usuarioActual.result.email);
        //obtenerUsuario(JSON.parse(localStorage.getItem('perfil')));
    }, []);
    

    return (
        <div className="container-fluid">
            <div className="row mx-auto">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="">
                        <h4>Datos de Contacto: {user.nombre}</h4>
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
                                        value={user.nombre}
                                        onChange={handleInputChange}
                                        name="nombre"
                                        placeholder="Nombre completo"
                                        disabled={user.googleId === "No Tiene" ? false : true}
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
                                    value={user.email}
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

                                            value={user?.direccion.calle}
                                            onChange={handleDireccionInputChange}
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
                                            value={user?.direccion.numero === null ? '' : user?.direccion.numero}
                                            onChange={handleDireccionInputChange}
                                            name="numero"
                                            placeholder="Número"
                                        />
                                    </div>
                                    <div className="col-md-12 mt-4">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="localidad"

                                            value={user?.direccion.localidad}
                                            onChange={handleDireccionInputChange}
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
                                        value={user.telefono === null ? '' : user.telefono}
                                        onChange={handleInputChange}
                                        name="telefono"
                                        placeholder="Teléfono"

                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Guardar
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