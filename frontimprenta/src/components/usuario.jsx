import React, { useState } from "react";

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

    const [user, setUser] = useState(estadoInicialUsuario);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };

    const login = () => {
        props.login(user)
        props.history.push('/');
    }

    return (
        <div className="submit-form">
            <div>
                <div className="form-group">
                    <label htmlFor="user">Nombre usuario:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        required
                        value={user.nombre}
                        onChange={handleInputChange}
                        name="name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="id">ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        required
                        value={user.id}
                        onChange={handleInputChange}
                        name="id"
                    />
                </div>

                <button onClick={login} className="btn btn-success">
                    Iniciar Sesión
        </button>
            </div>
        </div>
    );
};

export default Usuario;