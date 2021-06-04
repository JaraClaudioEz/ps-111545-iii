import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import logo from "../assets/IntegralLogo.png";

const Navbar = () => {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('perfil')));
    const history = useHistory();
    const location = useLocation();

    //console.log(user);
    /*
    async function login(user = null) {
        setUser(user)
    }
    */

    async function logout() {
        localStorage.clear();
        //localStorage.setItem('perfil', null)
        setUser(null);
        history.push('/');
    }

    useEffect(() => {
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('perfil')));
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
                            <li className="nav-item">
                                <Link to={"/pedidos"} className="nav-link">
                                    Pedidos
                                </Link>
                            </li>
                            <li className="nav-item">
                                {user ? (
                                    <a onClick={logout} className="nav-link" style={{ cursor: 'pointer' }}>
                                        Logout {user.resultado.name}
                                    </a>
                                ) : (
                                    <Link to={"/autorizacion"} className="nav-link">
                                        Login
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
        </div>
    );
};

export default Navbar;