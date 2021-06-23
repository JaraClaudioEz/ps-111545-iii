import Pedido from "../models/pedido.js";
import Producto from "../models/producto.js";

export default class PedidosController {
    static async apiGetItemsPedido(req, res, next) {
        const idUsuario = req.params.idUsuario;
        try {
            const pedido = await Pedido.findOne({ idUsuario });
            if (pedido && pedido.items.length > 0) {
                res.send(pedido);
            }
            else {
                res.send({message: "No tiene pedido", response: null});
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

}