import react from "react"
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';

const Inicio = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="display-1">IMPRENTA INTEGRAL IMAGEN</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to={"/productos"} className="btn btn-primary blck">Lista de Productos</Link></Col>
      </Row>
    </Container>




  );
}

export default Inicio;