import mercadopago from "mercadopago";

import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";
import Orden from "../models/orden.js";

mercadopago.configure({
    access_token: process.env.PROD_ACCESS_TOKEN
});

export default class OrdenesController {
    static async apiGetOrdenes(req, res, next) {
        const idUsuario = req.params.id;
        Orden.find({ idUsuario }).sort({ fecha: -1 }).then(ordenes => res.json(ordenes));
    }


    static async apiCheckout(req, res, next) {
        try {
            const idUsuario = req.params.id;
            //const { source } = req.body;
            const pedido = await Pedido.findOne({ idUsuario });
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
                    items: productos,
                    /*
                    payer: {
                        email: usuario.email,
                        name: usuario.nombre
                    },
                    */
                    back_urls: {
                        "success": "http://localhost:5000/api/v1/imprenta/ordenes/success",
                        "failure": "http://localhost:5000/api/v1/imprenta/ordenes/failure",
                        "pending": "http://localhost:5000/api/v1/imprenta/ordenes/pending"
                    },

                    auto_return: 'approved',
                };

                const respuesta = await mercadopago.preferences.create(preference);
                orden.preferenceId = respuesta.response.id;
                orden = await orden.save();
                //res.redirect(respuesta.body.init_point);

                //res.status(200).json(respuesta);
                res.status(200).json({ preferenceId: respuesta.response.id });
                //console.log(respuesta.id);
                /*
                mercadopago.preferences.create(preference)
                    .then(function (response) {
                        //console.log(response.body);
                        //res.json({ id: response.body.id })
                        res.redirect(response.body.init_point);
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

}