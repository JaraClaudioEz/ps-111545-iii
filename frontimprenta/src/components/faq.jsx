import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion'

const FAQ = () => {
    return (
        <Container className="landing pb-4 pt-2" fluid>
            <Row className="mt-4">
                <Col md={{ span: 6, offset: 3 }}>
                    <div>
                        <h4 className="display-4">Preguntas Frecuentes</h4>
                    </div>
                </Col>
            </Row>
            <Row className="my-4">
                <Col md={{ span: 8, offset: 2 }}>
                    <Accordion>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Hacen entregas a domicilio?</Accordion.Header>
                            <Accordion.Body>
                                No. Por el momento todas las órdenes de compra realizadas deben ser retiradas
                                en nuestro local personalmente. No realizamos envíos ni reparto en la ciudad de
                                Jesús María. No quita que en el futuro habilitemos esta posibilidad la cual
                                daremos aviso.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Tengo que proveer mis datos bancarios, de Tarjetas de Crédito, etc?</Accordion.Header>
                            <Accordion.Body>
                                No. No guardamos ningún dato bancario y/o de tarjetas de crédito. Los pagos
                                Realizados en nuestra página son gestionados íntegramente por Mercado Pago, no
                                nos responsablizamos ante algún inconveniente con un pago o con pérdida/robo de
                                los datos sensibles de facturación.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="2">
                            <Accordion.Header>Cómo es el proceso de compra?</Accordion.Header>
                            <Accordion.Body>
                                Primeramente para efectuar una compra debe poseer una cuenta registrada. Paso
                                seguido seleccione los productos que desea comprar y las cantidades de los mismos,
                                luego realize el checkout de su compra a través de Mercado Pago. Una vez que
                                desde Mercado Pago nos confirmen el pago efectivo de su compra, trabajaremos
                                sobre su pedido, una vez concluido el mismo daremos un aviso al email con que
                                se registró de que su orden de compra está lista para retirar por nuestro local.
                                Cuando retire su productos, la orden de compra quedará cerrada y el proceso culminado.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Tengo un problema con mi producto, aceptan devoluciones?</Accordion.Header>
                            <Accordion.Body>
                                No. Es muy importante que revise el producto al momento de retirarlo, cualquier
                                inquietud la solucionaremos en ese instante. Pasado este momento no nos responsabilizamos
                                ante cualquier defecto/error, tampoco aceptamos devoluciones.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="4">
                            <Accordion.Header>Desde que realizo el pago, cuantó tiempo demora la entrega?</Accordion.Header>
                            <Accordion.Body>
                                Una vez recibida la confirmación de compra, nos contactaremos para ultimar detalles de 
                                su compra. Luego realizaremos su pedido y en un plazo aproximado de dos semanas 
                                estará su producto listo para retirar. Ésto es en base a condiciones ideales, los plazos
                                reales pueden diferir para mejor o peor dependiendo de diversos factores. Igualmente, 
                                luego de superado este plazo, agradecemos que nos consulten sobre el estado de su pedido por
                                cualquiera de los medios de contacto disponibles. 
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Col>
            </Row>
        </Container>
    );
}

export default FAQ;