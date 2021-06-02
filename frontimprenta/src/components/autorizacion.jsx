import React, { useState } from 'react';

const Autorizacion = () => {

    const [mostrarPass, setMostrarPass] = useState(false);

    const registrado = true;

    const handleSubmit = () => {

    }

    const handleInputChange = () => {

    }

    const handleMostrarPass = () => setMostrarPass((prevMostrarPass) => !prevMostrarPass)

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
                        </div>
                    </form>
                </div>
                <div className="col-lg-3"></div>
            </div>

        </div>
    );
}

export default Autorizacion