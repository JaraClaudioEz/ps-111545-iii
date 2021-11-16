import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

import Contacto from './contacto'

import ImganeDataService from "../services/servicio-imagen";

const Inicio = () => {

  const [imagenes, setImagenes] = useState([]);

  const instagram = <FontAwesomeIcon icon={faInstagram} className="fa fa-5x" />

  useEffect(() => {
    traerImagenesIG();
  }, []);

  const traerImagenesIG = () => {

    const fotos = [];
    let max = 0;

    ImganeDataService.getImagenesIG()
      .then(response => {
        //console.log(response.data);
        response.data.forEach(element => {

          if (element.media_type === 'IMAGE' && max < 9) {
            fotos.push(element);
            max++;
          }
        });
        setImagenes(fotos);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="my-5">
      <div className='overlay'>
        <Container fluid>
          <Row>
            <Col>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  IMPRENTA INTEGRAL IMAGEN
                  <span></span>
                </h1>
                <p>Todo el branding que tu negocio necesita lo tenemos nosotros.</p>
                <a
                  href="/productos"
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Hacé tu pedido!!!
                </a>{' '}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div id='portfolio' className='text-center'>
        <Container>
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
  );
}

export default Inicio;