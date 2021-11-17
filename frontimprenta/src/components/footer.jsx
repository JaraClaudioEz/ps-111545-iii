import React from 'react';
import { Link } from "react-router-dom";
import { Col, Container, Row, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faHome, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'


const Footer = () => {

    const facebook = <FontAwesomeIcon icon={faFacebook} />
    const instagram = <FontAwesomeIcon icon={faInstagram} />
    const whatsapp = <FontAwesomeIcon icon={faWhatsapp} />
    const twitter = <FontAwesomeIcon icon={faTwitter} />
    const home = <FontAwesomeIcon icon={faHome} />
    const email = <FontAwesomeIcon icon={faEnvelope} />
    const phone = <FontAwesomeIcon icon={faPhone} />

    // style={{ backgroundColor: '#8A3033' }}

    return (

        <div>
            <footer className="text-dark text-center text-lg-start bg-ligth">

                <Container>

                    <Row>

                        <Col className="mb-4 mb-lg-0">
                            <h5 className="text-uppercase my-4 text-center">Asistencia</h5>

                            <ListGroup variant="flush">
                                <ListGroup.Item action as={Link} to="/contacto" className="bg-light">Contacto</ListGroup.Item>
                                <ListGroup.Item action as={Link} to="/faq" className="bg-light">Preguntas Frecuentes</ListGroup.Item>
                                <ListGroup.Item action as={Link} to="/legales" className="bg-light">Términos y Condiciones</ListGroup.Item>
                                <ListGroup.Item action as={Link} to="/empresa" className="bg-light">Sobre Nosotros</ListGroup.Item>
                                {/*<ListGroup.Item action as={Link} to="/" className="bg-light">Acerca de...</ListGroup.Item>*/}
                            </ListGroup>
                        </Col>

                        <Col>
                            <h5 className="text-uppercase my-4 text-center">Encuéntranos</h5>

                            <div className="mt-4 text-center">

                                <a href="https://es-la.facebook.com/integralimagen" type="button" className="btn btn-floating btn-light btn-lg">{facebook}</a>

                                <a href="https://instagram.com/integralimagen22" type="button" className="btn btn-floating btn-light btn-lg">{instagram}</a>

                                <a href="https://wa.me/5493525432374" type="button" className="btn btn-floating btn-light btn-lg">{whatsapp}</a>

                            </div>

                            <ul className="fa-ul mt-2" style={{ marginLeft: "1.65em" }}>
                                <li className="mb-3">
                                    <span className="fa-li">{home}</span><span className="ms-2">Cástulo Peña 769, Jesús María, Córdoba</span>
                                </li>
                                <li className="mb-3">
                                    <span className="fa-li">{email}</span><span className="ms-2">integralimagen@hotmail.com</span>
                                </li>
                                <li className="mb-3">
                                    <span className="fa-li">{phone}</span><span className="ms-2">+ 54 3525 427985</span>
                                </li>
                            </ul>
                        </Col>

                        <Col>
                            <h5 className="text-uppercase my-4 text-center">Nuestros Horarios</h5>

                            <table className="table text-center text-dark">
                                <tbody className="fw-normal">
                                    <tr>
                                        <td>Lun - Vie:</td>
                                        <td>9am - 12am</td>
                                    </tr>
                                    <tr>
                                        <td> </td>
                                        <td>17pm - 20pm</td>
                                    </tr>
                                    <tr>
                                        <td>Sábados:</td>
                                        <td>9am - 12am</td>
                                    </tr>
                                </tbody>
                            </table>
                        </Col>

                    </Row>

                </Container>

                <div className="text-dark text-center p-3 bg-light">
                    © 2021 Copyright:
                    <a className="text-dark" href="/">integralimagen.com</a>
                </div>

            </footer>
        </div>

    );
};

export default Footer;