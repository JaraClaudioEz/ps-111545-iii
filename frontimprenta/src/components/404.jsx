import { useHistory } from "react-router-dom";
import { Container, Col, Row, Alert} from 'react-bootstrap';

const NotFound = () => {

    const history = useHistory();

    return (
        <Container>
            <Row>
                <Col>
                    <Alert variant="danger" onClose={() => history.push("/")} dismissible>
                        <Alert.Heading>404 Página no Encontrada</Alert.Heading>
                        <p>
                            La dirección que intentas ingresar no se encuentra.
                        </p>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}

export default NotFound;


