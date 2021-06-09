import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import logo from "../assets/IntegralLogo.png";

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('perfil')));
    const history = useHistory();
    const location = useLocation();

    async function logout() {
        localStorage.clear();
        //localStorage.setItem('perfil', null)
        setUser(null);
        history.push('/');
    }

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('perfil')));

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    }, [location])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} alt="Integral Imagen" width="35%" height="30%" className="d-inline-block align-text-top" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to={"/productos"} className="nav-link">
                                    Productos
                                </Link>
                            </li>
                            <div>
                                {
                                    user === null ? (
                                        <span></span>
                                    ) : (
                                        <li className="nav-item">
                                            {
                                                user && user?.result.tipo === "admin" ? (
                                                    <Link to={"/pedidos"} className="nav-link">
                                                        Ver Pedidos
                                                    </Link>
                                                ) : (
                                                    <Link to={"/pedido"} className="nav-link">
                                                        Mi Pedido
                                                    </Link>
                                                )
                                            }
                                        </li>
                                    )
                                }
                            </div>
                            <div>
                                {
                                    user === null ? (
                                        <span></span>
                                    ) : (
                                        <li className="nav-item">
                                            {
                                                user && user?.result.tipo === "admin" ? (
                                                    <Link to={"/usuarios"} className="nav-link">
                                                        Clientes
                                                    </Link>
                                                ) : (
                                                    <Link to={"/usuario"} className="nav-link">
                                                        Mi Perfil
                                                    </Link>
                                                )
                                            }
                                        </li>
                                    )
                                }
                            </div>
                            <li className="nav-item">
                                {user ? (
                                    <a onClick={logout} className="nav-link btn btn-danger" style={{ cursor: 'pointer' }}>
                                        Cerrar Sesión
                                    </a>
                                ) : (
                                    <Link to={"/autorizacion"} className="nav-link btn btn-success">
                                        Iniciar Sesión
                                    </Link>
                                )}
                            </li>
                        </ul>
                        <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Buscar</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div >
    );
};

export default Navbar;