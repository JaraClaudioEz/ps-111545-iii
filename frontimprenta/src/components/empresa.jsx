import React from "react";
import { Image, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngrycreative } from '@fortawesome/free-brands-svg-icons'
import { faBookOpen, faStamp, faPalette, faAward } from '@fortawesome/free-solid-svg-icons'

import portada from "../assets/portada.png"
import CarouselInicio from "./carousel";

//<img src={portada} className="img-responsive" alt="" />

const Empresa = () => {

    const angry = <FontAwesomeIcon icon={faAngrycreative} className="fa" />
    const imprenta = <FontAwesomeIcon icon={faBookOpen} className="fa" />
    const estampado = <FontAwesomeIcon icon={faStamp} className="fa" />
    const carteleria = <FontAwesomeIcon icon={faPalette} className="fa" />

    const ser1 = <FontAwesomeIcon icon={faAward} className="fa" />

    return (
        <div>
            <Row>
                <Col>
                    <div id="about">
                        <div className="container">
                            <div className="row">
                                <div className="col-xs-12 col-md-6">
                                    {" "}
                                    <Image src={portada} alt='Integral Imagen' rounded fluid />
                                    {" "}
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
            <Row className="my-4">
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
            <Row className="mb-4">
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
        </div>
    );
}

export default Empresa;

/*
<Row>
    <Col></Col>
    <Col xs={6} className="my-4">
        <CarouselInicio />
    </Col>
    <Col></Col>
</Row>
<div className="my-5">
      <header id='header'>
        <div className='bg-info'>
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
                      href="#especialidades"
                      className='btn btn-custom btn-lg page-scroll'
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
      <div id='portfolio' className='text-center'>
        <Container>
          <div className='section-title'>
            <h2>Galería de Trabajos</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
              dapibus leonec.
            </p>
          </div>
          <Row>
            <div className='portfolio-items'>
              <Row>
                {imagenes.map((imagen) => {
                  return (
                    <Col key={imagen.id} xs={6} md={4} className='d-flex align-items-center'>
                      <div className='portfolio-item'>
                        <div className='hover-bg'>
                          {' '}
                          <a
                            href={imagen.permalink}
                            title='Ver en Instagram...'
                          >
                            <div className='hover-text'>
                              <h4 style={{ fontSize: '1.25vw' }}>{instagram}</h4>
                            </div>
                            <Image src={imagen.media_url} alt='Integral Imagen' rounded fluid />{' '}
                          </a>{' '}
                        </div>
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
          </Row>
        </Container>
      </div>
      <Row>
        <Col>
          <Contacto />
        </Col>
      </Row>

    </div>
    */