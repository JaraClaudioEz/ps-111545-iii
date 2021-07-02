import React from "react"
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Alert } from 'react-bootstrap';

import OrdenDataService from "../services/servicio-orden.js";
import PedidoDataService from "../services/servicio-pedido";

const ProcesoPago = ({ usuario }) => {

    const { search } = useLocation();
    const history = useHistory();

    let estado = '';
    let idPago = '';
    let idOrden = '';
    let idPreferencia = '';

    if (search) {
        const searchParams = new URLSearchParams(search);
        estado = searchParams.get('status');
        idPago = searchParams.get('payment_id');
        idOrden = searchParams.get('external_reference');
        idOrden = idOrden.replace(/^"(.*)"$/, '$1')
        idPreferencia = searchParams.get('preference_id');
    }

    console.log(estado);

    if (estado !== "null") {
        const data = {
            idOrden: idOrden,
            estado: estado,
            idPago: idPago
        };
        actualizarOrden(data);
    }
    else {
        setTimeout(() => {
            //history.push(`/pedido`);
        }, 10000);
    }

    const Cancelado = () => (
        <Alert variant="danger">
            <Alert.Heading>Oh no! Pago cancelado!</Alert.Heading>
            <p>
                Por alguna razón cancelaste el proceso de pago en Mercado Pago,
                tu orden de compra no ha sido generada. Te redireeccionaremos a
                tu pedido para que completes la operación.
            </p>
        </Alert>
    );

    const actualizarOrden = async (data) => {
        try {
            const resultado = await OrdenDataService.updateOrden(data);
            //history.push(`/orden/${idOrden}`);
        } catch (error) {
            console.log(error);
        }
    };

    console.log(usuario);

    return (
        <Container>
            <Row>
                <Col>
                    {
                        estado !== null ?
                            (
                                <h6>Redireccionando...</h6>
                            ) : (
                                <Cancelado />
                            )
                    }

                </Col>
            </Row>
        </Container>
    );
}

export default ProcesoPago;