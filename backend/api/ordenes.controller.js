import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";
import Orden from "../models/orden.js";

export default class OrdenesController {
    static async apiGetOrdenes(req, res, next) {
        const idUsuario = req.params.id;
        Orden.find({ idUsuario }).sort({ fecha: -1 }).then(ordenes => res.json(ordenes));
    }


    static async apiPostOrden(req, res, next) {
        try {
            const idUsuario = req.params.id;
            const { source } = req.body;
            let pedido = await Pedido.findOne({ idUsuario });
            let usuario = await Usuario.findOne({ _id: idUsuario });
            const email = usuario.email;
            if (pedido) {
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