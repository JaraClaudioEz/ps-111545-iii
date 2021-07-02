import Pedido from "../models/pedido.js";
import Producto from "../models/producto.js";

export default class PedidosController {
    static async apiGetItemsPedido(req, res, next) {
        const idUsuario = req.params.idUsuario;
        try {
            const pedido = await Pedido.findOne({ idUsuario });
            //console.log(pedido);
            if (pedido && pedido.items.length > 0) {
                res.status(200).send(pedido);
            }
            else {
                res.status(204).send(null);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Algo anduvo mal al obtener items del pedido");
        }

    }

    static async apiAddItemPedido(req, res, next) {
        const idUsuario = req.params.idUsuario;
        const { idProducto, cantidad } = req.body;

        try {
            let pedido = await Pedido.findOne({ idUsuario });
            let item = await Producto.findOne({ _id: idProducto });
            if (!item) {
                res.status(404).send('Producto no encontrado!')
            }

            const precio = item.precio;
            const nombre = item.nombre_producto;

            if (pedido) {
                // if cart exists for the user
                let itemIndex = pedido.items.findIndex(p => p.idProducto == idProducto);

                // Check if product exists or not
                if (itemIndex > -1) {
                    let productItem = pedido.items[itemIndex];
                    productItem.cantidad += cantidad;
                    pedido.items[itemIndex] = productItem;
                }
                else {
                    pedido.items.push({ idProducto, nombre, cantidad, precio });
                }
                pedido.importe += cantidad * precio;
                pedido = await pedido.save();
                return res.status(201).send(pedido);
            }
            else {
                // no cart exists, create one
                const nuevoPedido = await Pedido.create({
                    idUsuario,
                    items: [{ idProducto, nombre, cantidad, precio }],
                    importe: cantidad * precio
                });
                return res.status(201).send(nuevoPedido);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Algo anduvo mal al agrergar item al pedido.");
        }
    }


    static async apiDeleteItemPedido(req, res, next) {
        const idUsuario = req.params.idUsuario;
        const idProducto = req.params.id;
        try {
            let pedido = await Pedido.findOne({ idUsuario });
            let itemIndex = pedido.items.findIndex(p => p._id == idProducto);
            if (itemIndex > -1) {
                let productItem = pedido.items[itemIndex];
                pedido.importe -= productItem.cantidad * productItem.precio;
                pedido.items.splice(itemIndex, 1);
            }
            pedido = await pedido.save();
            return res.status(201).send(pedido);
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Algo anduvo mal al borrar item del pedido.");
        }
    }

    static async apiVaciarPedido(req, res, next) {
        const idUsuario = req.params.idUsuario;
        try {
            let pedido = await Pedido.findOne({ idUsuario });

            //const data = await Pedido.findByIdAndDelete({ _id: pedido.id })

            //const data = await Pedido.updateOne({ _id: pedido._id} ,{$set: {items: []}});
            pedido.importe = 0;
            pedido.items = [];

            const resultado = await Pedido.updateOne(
                { _id: pedido._id },
                { $set: pedido },
            );
            res.status(201).send(pedido);

        } catch (error) {
            console.log(error);
            res.status(500).send("Algo anduvo mal al vaciar el pedido.");
        }
    };

}