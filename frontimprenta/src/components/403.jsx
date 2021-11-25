import { useHistory } from "react-router-dom";
import { Container, Col, Row, Alert} from 'react-bootstrap';

const AccessDenied = () => {

    const history = useHistory();

    return (
        <Container className="py-4">
            <Row>
                <Col>
                    <Alert variant="danger" onClose={() => history.push("/autorizacion")} dismissible>
                        <Alert.Heading>403 Acceso Denegado</Alert.Heading>
                        <p>
                            No tienes permisos para acceder a la página que intentas ingresar. Debes iniciar sesión.
                        </p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default AccessDenied;

