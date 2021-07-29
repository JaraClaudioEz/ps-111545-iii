import react from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col, Carousel } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngrycreative } from '@fortawesome/free-brands-svg-icons'
import { faBookOpen, faStamp, faPalette, faAward } from '@fortawesome/free-solid-svg-icons'

import Contacto from './contacto'
import "../inicio.css";
import intimg from "../assets/intimg.png"
import portada from "../assets/portada.png"

const Inicio = () => {

  const angry = <FontAwesomeIcon icon={faAngrycreative} className="fa" />
  const imprenta = <FontAwesomeIcon icon={faBookOpen} className="fa" />
  const estampado = <FontAwesomeIcon icon={faStamp} className="fa" />
  const carteleria = <FontAwesomeIcon icon={faPalette} className="fa" />

  const ser1 = <FontAwesomeIcon icon={faAward} className="fa" />

  return (
    <div className="my-5">
      <header id='header'>
        <div className='intro'>
          <div className='overlay'>
            <Container>
              <Row>
                <Col>
                  <div className='col-md-8 col-md-offset-2 intro-text'>
                    <h1>
                      IMPRENTA INTEGRAL IMAGEN
                      <span></span>
                    </h1>
                    <p>Todo el branding que tu negocio necesita lo tenemos nosotros.</p>
                    <a
                      
                      className='btn btn-custom btn-lg page-scroll'
                      as={Link}
                      to="/productos"
                    >
                      Nuestras Especialidades
                    </a>{' '}
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </div>
      </header>
      <Row>
        <Col>
          <Carousel>
            <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src={intimg}
                alt="Primera slide"

                height="400"
              />
              <Carousel.Caption>
                <h3>Primer feed</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                className="d-block w-100"
                src={intimg}
                alt="Segunda slide"

                height="400"
              />
              <Carousel.Caption>
                <h3>Segundo feed</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={intimg}
                alt="Tercera slide"

                height="400"
              />
              <Carousel.Caption>
                <h3>Tercer feed</h3>
                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row>
        <Col>
          <div id='especialidades' className='text-center'>
            <div className='container'>
              <div className='col-md-10 col-md-offset-1 section-title'>
                <h2>Especialidades</h2>
              </div>
              <div className='row'>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  {angry}
                  <h3>Creatividad</h3>
                  <p>Nuestros diseños van como piña!</p>
                </div>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  {imprenta}
                  <h3>Imprenta</h3>
                  <p>Todos los papelistos!</p>
                </div>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  {estampado}
                  <h3>Estampado</h3>
                  <p>Remeras, chombas, sábanas!</p>
                </div>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  {carteleria}
                  <h3>Cartelería</h3>
                  <p>Aniverasarios, negocios, eventos!</p>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div id="about">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-6">
                  {" "}
                  <img src={portada} className="img-responsive" alt="" />{" "}
                </div>
                <div className="col-xs-12 col-md-6">
                  <div className="about-text">
                    <h2>Sobre Nosotros</h2>
                    <p>Somos una empresa familiar con 20 años de experiencia. Cubrimos la más amplia gama de productos...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</p>
                    <h3>Por qué elegirnos?</h3>
                    <div className="list-style">
                      <div className="col-lg-6 col-sm-6 col-xs-12">
                        <ul>
                          <li>Bueno</li>
                          <li>Barato</li>
                          <li>Bonito</li>
                        </ul>
                      </div>
                      <div className="col-lg-6 col-sm-6 col-xs-12">
                        <ul>
                          <li>Recontra bueno</li>
                          <li>Recontra barato</li>
                          <li>Recontra bonito</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div id='services' className='text-center'>
            <div className='container'>
              <div className='section-title'>
                <h2>Nuestros Servicios</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
                  dapibus leonec.
                </p>
              </div>
              <div className='row'>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Lorem ipsum dolor</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sedasd commodo nibh ante facilisis bibendum dolor feugiat at.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>

        </Col>
      </Row>
      <Row>
        <Col>
          <Contacto />
        </Col>
      </Row>

    </div>
  );
}

export default Inicio;