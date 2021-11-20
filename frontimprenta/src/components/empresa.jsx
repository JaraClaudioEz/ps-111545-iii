import React from "react";
import { Image, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint, faTshirt, faSign, faAward, faHandshake } from '@fortawesome/free-solid-svg-icons'

import portada from "../assets/portada.png"
import CarouselInicio from "./carousel";

import "../empresa.css";

//<img src={portada} className="img-responsive" alt="" />

const Empresa = () => {

  const manos = <FontAwesomeIcon icon={faHandshake} className="fa" />
  const imprenta = <FontAwesomeIcon icon={faTint} className="fa" />
  const estampado = <FontAwesomeIcon icon={faTshirt} className="fa" />
  const carteleria = <FontAwesomeIcon icon={faSign} className="fa" />

  const ser1 = <FontAwesomeIcon icon={faAward} className="fa" />

  return (
    <div className="landing">
      <Row className="head">
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
                    <p>Somos una empresa familiar con más de 15 años de experiencia dedicada a la solución gráfica de nuestros clientes, basada en la calidad, el compromiso y el trabajo en equipo.</p>
                    <h3>Por qué elegirnos?</h3>
                    <div className="list-style">
                      <div className="col-lg-6 col-sm-6 col-xs-12">
                        <p>Nos destacamos en brindar beneficios al cliente en cuanto a calidad y velocidad de entrega.</p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="py-2">
        <Col>
          <div id='especialidades' className='text-center'>
            <div className='container'>
              <div className='col-md-10 py-2'>
                <h2>Especialidades</h2>
              </div>
              <div className='row'>
              <div className='col-xs-6 col-md-3'>
                  {' '}
                  {manos}
                  <h3>Calidad Humana</h3>
                  
                </div>
                
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  {imprenta}
                  <h3>Imprenta</h3>
                  
                </div>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  {estampado}
                  <h3>Estampado</h3>
                  
                </div>
                <div className='col-xs-6 col-md-3'>
                  {' '}
                  {carteleria}
                  <h3>Cartelería</h3>
                  
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
                  Contamos con el mejor servicio gráfico del mercado.
                </p>
              </div>
              <div className='row'>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Calidad</h3>
                    <p>Estamos orgullosos de saber que los productos que entregamos a nuestros clientes están por encima de la calidad promedio, en Integral Imagen seleccionamos los proveedores con lo estándares más alto del mercado.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Servicio</h3>
                    <p>Cada vez que recibimos un pedido, éste es registrado y seguido muy de cerca en cada etapa, desde el control de la elaboración del producto, pasando por la coordinación de proveedores, hasta el aviso por e-mail cuando el trabajo esta listo.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Experiencia</h3>
                    <p>Nuestros 15 años de trayectoria avalan nuestra experiencia a la hora de elaborar un producto, seleccionar un proveedor y brindar el mejor asesoramiento.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Tecnología</h3>
                    <p>El sistema de gestión administrativa que poseemos fue diseñado específicamente para nuestras necesidades y es optimizado permanentemente.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Atención al CLiente</h3>
                    <p>Se podrá contactar con nosotros por e-mail, teléfono, redes sociales o por formulario de contacto, obteniendo siempre una rápida respuesta, y soluciones acordes a sus necesidades.</p>
                  </div>
                </div>
                <div className='col-md-4'>
                  {' '}
                  {ser1}
                  <div className='service-desc'>
                    <h3>Rotación</h3>
                    <p>Los productos que ofrecemos están entre los mas comúnmente solicitados y son de alta rotación.</p>
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