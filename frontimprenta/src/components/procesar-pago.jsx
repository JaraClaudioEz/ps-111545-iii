import React from "react"
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Alert } from 'react-bootstrap';

import OrdenDataService from "../services/servicio-orden.js";

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

    //console.log(estado);

    const actualizarOrden = async (data) => {
        try {
            const respuesta = await OrdenDataService.updateOrden(data);
            history.push(`/orden/${idOrden}`);
        } catch (error) {
            console.log(error);
        }
    };

    const eliminarOrden = async () => {
        try {
            const respuesta = await OrdenDataService.deleteOrden(idOrden);
            history.push(`/pedido`);
        } catch (error) {
            console.log(error);
        }
    };

    if (estado !== "null") {
        const data = {
            idOrden: idOrden,
            estado: estado,
            idPago: idPago
        };
        actualizarOrden(data);
    }
    else {
        //Luego implementar redireccionamiento directo al pedido con cartel de alerta incluido en el mismo.
        setTimeout(() => {
            eliminarOrden();
        }, 5000);
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

    //console.log(usuario);

    return (
        <Container>
            <Row>
                <Col>
                    {
                        estado !== "null" ?
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