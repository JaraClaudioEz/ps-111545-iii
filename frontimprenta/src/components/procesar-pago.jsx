import React, { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom";
import { Container, Row, Col, Alert } from 'react-bootstrap';

import OrdenDataService from "../services/servicio-orden.js";
import PedidoDataService from "../services/servicio-pedido.js";

const ProcesoPago = () => {

    const [id, setId] = useState(null);
    const [estado, setEstado] = useState('');
    const { search } = useLocation();
    const history = useHistory();


    useEffect(() => {
        handleRespuesta();
    }, [search])

    const handleRespuesta = () => {
        let nuevoEstado = '';
        let idPago = '';
        let idOrden = '';
        let idPreferencia = '';

        if (search) {
            const searchParams = new URLSearchParams(search);
            nuevoEstado = searchParams.get('status');
            idPago = searchParams.get('payment_id');
            idOrden = searchParams.get('external_reference');
            idOrden = idOrden.replace(/^"(.*)"$/, '$1')
            idPreferencia = searchParams.get('preference_id');
            setId(idOrden);
            setEstado(nuevoEstado);
        }

        if (nuevoEstado !== "null") {
            const data = {
                idOrden: idOrden,
                estado: nuevoEstado,
                idPago: idPago
            };
            actualizarOrden(data);
        }
        else {
            //Luego implementar redireccionamiento directo al pedido con cartel de alerta incluido en el mismo.
            setTimeout(() => {
                eliminarOrden(idOrden);
            }, 5000);
        }
    };

    //console.log(id);
    //console.log(estado);

    const actualizarOrden = async (data) => {

        OrdenDataService.updateOrden(data)
            .then(response => {
                if (estado !== "null") {
                    history.push(`/orden/${response.data.orden._id}`);
                }
            })
            //console.log(respuesta);
            .catch(error => {
                console.log(error);
            });
    };

    const eliminarOrden = async (id) => {
        try {

            const respuesta = await OrdenDataService.deleteOrden(id);
            history.push(`/pedido`);
        } catch (error) {
            console.log(error);
        }
    };


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