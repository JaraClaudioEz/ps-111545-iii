import React, { useEffect } from 'react';
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Badge, Col } from 'react-bootstrap';

import logo from "../assets/IntegralLogo.png";

const NavbarImprenta = ({ totalItems, user }) => {

    //const [user, setUser] = useState(JSON.parse(localStorage.getItem('perfil')));
    const history = useHistory();
    const location = useLocation();

    async function logout() {
        localStorage.clear();
        //localStorage.setItem('perfil', null)
        //setUser(null);
        history.push('/');
    }

    let nombre = "";
    const obtenerNombre = () => {
        if (user.result.nombre) {
            nombre = user.result.nombre;
        }
        else if (user.result.name) {
            nombre = user.result.name;
        }
        return nombre;
    };

    useEffect(() => {
        const token = user?.token;
        //setUser(JSON.parse(localStorage.getItem('perfil')));

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    }, [location])

    return (
        <Col>
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
                                                <Nav.Link as={Link} to="/ordenes">Ordenes</Nav.Link>
                                            ) : (
                                                <Nav.Link as={Link} to="/pedido">
                                                    Mi Pedido <Badge variant="dark" className="btn-success">({totalItems})</Badge>
                                                </Nav.Link>
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
                                                <Nav.Link as={Link} to={{ pathname: "/usuario/" + obtenerNombre(), state: { usuarioActual: user } }}>Mi Perfil</Nav.Link>
                                            )
                                        }
                                    </span>
                                )
                            }
                        </div>
                        <div>
                            {
                                user && user?.result.tipo !== "admin" ? (
                                    <Nav.Link as={Link} to="/ordenes">Mis Ordenes</Nav.Link>

                                ) : (
                                    <span></span>
                                )
                            }
                        </div>
                        <div>
                            {
                                user && user?.result.tipo === "admin" ? (
                                    <Nav.Link as={Link} to="/reportes">Reportes</Nav.Link>

                                ) : (
                                    <span></span>
                                )
                            }
                        </div>
                        <NavDropdown title="Ayuda" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/contacto">Contactenos</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/legales">Términos y Condiciones</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/info">Acerca de...</NavDropdown.Item>
                        </NavDropdown>
                        <div>
                            {
                                user ? (
                                    <Nav.Link onClick={logout} className="btn btn-danger">Cerrar Sesión</Nav.Link>
                                ) : (
                                    <Nav.Link as={Link} to="/autorizacion" className="btn btn-success">Iniciar Sesión</Nav.Link>
                                )
                            }
                        </div>
                    </Nav>
                    <Nav className="mr-auto">
                        <Form inline className="navbar-nav navbar-right">
                            <FormControl type="text" placeholder="Search" className="mr-sm-6" />
                            <Button variant="outline-success" className="ml-6">Buscar</Button>
                        </Form>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Col>
    );
};

export default NavbarImprenta;