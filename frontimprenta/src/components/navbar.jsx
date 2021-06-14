import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';

import logo from "../assets/IntegralLogo.png";

const NavbarImprenta = () => {

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

            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="160"
                        height="50"
                        className="d-inline-block align-top"
                        alt="Integral Imagen"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                        <div>
                            {
                                user === null ? (
                                    <span></span>
                                ) : (
                                    <span>
                                        {
                                            user && user?.result.tipo === "admin" ? (
                                                <Nav.Link as={Link} to="/pedidos">Ver Pedidos</Nav.Link>
                                            ) : (
                                                <Nav.Link as={Link} to="/pedido">Mi Pedido</Nav.Link>
                                            )
                                        }
                                    </span>
                                )
                            }
                        </div>
                        <div>
                            {
                                user === null ? (
                                    <span></span>
                                ) : (
                                    <span>
                                        {
                                            user && user?.result.tipo === "admin" ? (
                                                <Nav.Link as={Link} to="/usuarios">Clientes</Nav.Link>

                                            ) : (
                                                <Nav.Link as={Link} to="/usuario">Mi Perfil</Nav.Link>
                                            )
                                        }
                                    </span>
                                )
                            }
                        </div>
                        <NavDropdown title="Ayuda" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/contacto">Contactenos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/legales">Términos y Condiciones</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/info">Acerca de...</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link>
                            {user ? (
                                <a onClick={logout} className="nav-link btn btn-danger" style={{ cursor: 'pointer' }}>
                                    Cerrar Sesión
                                </a>
                            ) : (
                                <Link to={"/autorizacion"} className="nav-link btn btn-success">
                                    Iniciar Sesión
                                </Link>
                            )}
                        </Nav.Link>
                    </Nav>
                    <Form inline className="d-flex">
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success" className="ml-6">Buscar</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </div >
    );
};

export default NavbarImprenta;