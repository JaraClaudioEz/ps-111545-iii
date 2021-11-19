import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'

import Contacto from './contacto'

import ImganeDataService from "../services/servicio-imagen";
import logo from "../assets/logo.png"

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
    <div>
      <div className="head">
        <Container >
          <Row className="align-items-center">
            <Col sm={8}>
              <p className="display-4">
                Hacemos que te <b>distingas...</b>
                <span></span>
              </p>
              <div id="btn-tienda" className="d-grid gap-2">
                <Button variant="light" size="lg" href="/productos">
                  Encargá Aquí
                </Button>
              </div>
              {' '}
            </Col>
            <Col sm={4} className="p-3">
              <div className="m-4">
              <Image src={logo} alt='Integral Imagen' fluid />
              </div>
              
            </Col>
          </Row>
        </Container>
      </div>
      <div className="landing">
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
    </div>
  );
}

export default Inicio;
