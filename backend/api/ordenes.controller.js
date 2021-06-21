import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";
import Orden from "../models/orden.js";
import mercadopago from "mercadopago";

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
            let pedido = await Pedido.findOne({ idUsuario });
            let usuario = await Usuario.findOne({ _id: idUsuario });
            const email = usuario.email;
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

                let preference = {
                    /*
                    items: [
                        {
                        title: req.body.description,
                        unit_price: Number(req.body.price),
                        quantity: Number(req.body.quantity),
                    }]
                    */
                    items: [
                        {
                            title: 'Mi producto',
                            unit_price: 100,
                            quantity: 1,
                        }
                    ]
                    ,
                    back_urls: {
                        "success": "http://localhost:5000/api/v1/imprenta/ordenes/success",
                        "failure": "http://localhost:5000/api/v1/imprenta/ordenes/failure",
                        "pending": "http://localhost:5000/api/v1/imprenta/ordenes/pending"
                    },
                    auto_return: 'approved',
                };

                mercadopago.preferences.create(preference)
                    .then(function (response) {
                        console.log(response.body);
                        res.json({ id: response.body.id })
                    }).catch(function (error) {
                        console.log(error);
                    });

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