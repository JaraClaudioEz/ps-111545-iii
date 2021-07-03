import mercadopago from "mercadopago";

import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";
import Orden from "../models/orden.js";

mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN
});

export default class OrdenesController {
    static async apiGetOrdenesUsuario(req, res, next) {
        const idUsuario = req.params.id;
        //console.log(req.params);
        try {
            const ordenes = await Orden.find({ idUsuario: idUsuario }).sort({ fecha: -1 });
            //console.log(ordenes.length);
            if (ordenes.length > 0) {
                res.status(200).json({ ordenes });
            }
            else {
                res.status(204).json(null);
            };

        } catch (error) {
            console.log(error);
        }
        //Orden.find({ idUsuario }).sort({ fecha: 1 }).then(ordenes => res.json(ordenes));
    }

    static async apiGetOrdenes(req, res, next) {

        const ordenesPorPagina = req.query.ordenesPorPagina ? parseInt(req.ordenesPorPagina, 10) : 20
        const pag = req.query.pag ? parseInt(req.query.pag, 10) : 0

        let filtros = {};
        //filtros.tipo = "cliente";
        if (req.query.estado) {
            filtros.estado = req.query.estado
        }

        let query
        if (filtros) {
            if ("estado" in filtros) {
                query = { "estado": { $eq: filtros["estado"] } }
            }
        }

        try {
            const listaOrdenes = await Orden.find(query, { preferenceId: 0 }).limit(ordenesPorPagina).skip(ordenesPorPagina * pag)
            const totalOrdenes = await Orden.countDocuments(query)

            let response = {
                ordenes: listaOrdenes,
                pagina: pag,
                filtros: filtros,
                entradas_por_pagina: ordenesPorPagina,
                total_resultados: totalOrdenes,
            }
            return res.status(200).json(response)
        } catch (e) {
            console.error(`No se pudo traer listado de ordenes, ${e}`)
            return { listaOrdenes: [], totalOrdenes: 0 }
        }

    }

    static async apiGetOrden(req, res, next) {
        const id = req.params.id;
        //console.log(req.params);
        try {

            const orden = await Orden.findOne({ _id: id });
            if (!orden) {
                return res.status(404).json({ message: "La orden no existe." });
            };

            res.json(orden)
        } catch (e) {
            console.log(`apiGetOrden, ${e}`);
            res.status(500).json({ error: e })
        }
    }

    static async apiCheckout(req, res, next) {

        try {
            const idUsuario = req.params.id;
            //const { source } = req.body;
            let pedido = await Pedido.findOne({ idUsuario });
            let usuario = await Usuario.findOne({ _id: idUsuario });

            if (pedido) {
                /*
                const charge = await stripe.charges.create({
                    amount: pedido.importe,
                    currency: 'inr',
                    source: source,
                    receipt_email: email
                })
                if (!charge) throw Error('El pago fallo!');
                if (charge) {
                    const orden = await Orden.create({
                        idUsuario,
                        items: pedido.items,
                        factura: pedido.importe
                    });
                    const data = await Pedido.findByIdAndDelete({ _id: pedido.id });
                    return res.status(201).send(orden);
                }
                */
                let orden = await Orden.create({
                    idUsuario: pedido.idUsuario,
                    items: pedido.items,
                    factura: pedido.importe
                });

                let productos = orden.items.map((item) => ({
                    title: item.nombre,
                    quantity: item.cantidad,
                    unit_price: item.precio,
                }));

                let preference = {
                    external_reference: JSON.stringify(orden._id),
                    //notification_url: `${ENV['HOST']}/api/v1/imprenta/ordenes/mp`,
                    //notification_url: `http://localhost:${process.env.PORT}/api/v1/imprenta/ordenes/mp`, SOLO EN PRODUCCION
                    items: productos,
                    /*
                    payer: {
                        email: usuario.email,
                        name: usuario.nombre
                    },
                    */
                    back_urls: {
                        "success": "http://localhost:3000/orden/respuestamp",
                        "failure": "http://localhost:3000/orden/respuestamp",
                        "pending": "http://localhost:3000/orden/respuestamp"
                    },

                    auto_return: 'approved',
                };

                const respuesta = await mercadopago.preferences.create(preference);
                orden.preferenceId = respuesta.response.id;
                orden = await orden.save();
                //res.redirect(respuesta.body.init_point);
                //const borrado = await Pedido.findByIdAndDelete(pedido._id);
                //console.log(borrado);
                //res.status(200).json(respuesta);
                res.status(200).json({ preferenceId: respuesta.response.id, checkoutURL: respuesta.response.init_point });
                //console.log(respuesta.id);
                /*
                mercadopago.preferences.create(preference)
                    .then(function (response) {
                        //console.log(response.body);
                        //res.json({ id: response.body.id });
                        //res.redirect(response.body.init_point);
                        orden.preferenceId = response.body.id;
                        orden = orden.save();
                        console.log(pedido);
                        Pedido.findByIdAndDelete(pedido._id);
                        res.status(200).json({ preferenceId: response.body.id, checkoutURL: response.body.init_point });
                    }).catch(function (error) {
                        console.log(error);
                    });
                /*
                const nuevaOrden = await Orden.create({
                    idUsuario,
                    items: pedido.items,
                    factura: pedido.importe
                })
                */

            }
            else {
                res.status(500).send("No tienes items en el pedido");
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Algo anduvo mal al generar una orden");
        }

    }

    static async apiGetIPNMP(req, res, next) {
        if (req.params.type === 'payment') {
            const paymentId = req.params.data.id; // ID de payment en MercadoPago

            mercadopago.payments.get(paymentId).then((error, payment) => {

                const idOrden = payment.external_reference;

                Orden.findOne(idOrden).then((orden) => {

                    if (orden.factura === payment.transaction_amount) {
                        orden.estado = payment.status;
                        orden.idPago = paymentId;

                        // comprobamos que sea "approved" y que no hayamos entregado ya el pedido... recuerda que "order" es algo que
                        // debes implementar tu, que podría tener un cambpo "delivered" para saber si ya hiciste entrega o no del
                        // pedido
                        if (orden.estado === 'approved') {
                            orden = orden.save();
                        }
                    }

                });
            });
        }
    }

    static async apiUpdateOrden(req, res, next) {

        //console.log(req.body);

        const idOrden = req.body.idOrden;
        const status = req.body.estado;
        const idPago = req.body.idPago;

        let estado = '';
        switch (status) {
            case 'pending':
                estado = "pendiente";
                break;
            case 'approved':
                estado = "abonada";
                break;
            case 'authorized':
                estado = "abonada";
                break;
            case 'in_process':
                estado = "pendiente";
                break;
            case 'in_mediation':
                estado = "mediacion";
                break;
            case 'rejected':
                estado = "rechazado";
                break;
            case 'cancelled':
                estado = "cancelado";
                break;
            case 'refunded':
                estado = "reembolso";
                break;
            case 'charged_back':
                estado = "reembolso";
                break;
            default:
                estado = "pendiente";
                break;
        }

        //console.log(estado);
        try {

            let orden = await Orden.findOne({ _id: idOrden });
            //console.log(orden);
            orden.idPago = idPago;
            orden.estado = estado;
            orden = await orden.save();
            //console.log({ actualizada: orden });
            const usuario = await Usuario.findOne({ _id: orden.idUsuario });
            //console.log(usuario);
            const pedido = await Pedido.findOneAndDelete({ idUsuario: usuario._id });
            //res.status(200).json({ message: "Pago acentado" });
            res.status(200).json({ orden: orden });

        } catch (error) {
            console.log(error);
        }

    };

    static async apiGetEstados(req, res, next) {

    };

    static async apiDeleteOrden(req, res, next) {
        try {
            const idOrden = req.query.id

            const deleteResponse = await Orden.findByIdAndDelete({ _id: idOrden })

            res.json({ status: "Eliminado", id: idOrden })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    };
}