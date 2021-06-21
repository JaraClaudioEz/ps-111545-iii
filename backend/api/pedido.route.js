import express from "express";

import PedidoCtrl from "./pedidos.controller.js";
import autorizacion from "../middleware/autorizacion.js"

const router = express.Router();

router.route("/:idUsuario")
    .get(PedidoCtrl.apiGetItemsPedido)
    .post(PedidoCtrl.apiAddItemPedido)

router.route("/:idUsuario/:id").delete(PedidoCtrl.apiDeleteItemPedido)

/*
router.get('/cart/:id', cartController.get_cart_items);
router.post('/cart/:id', cartController.add_cart_item);
router.delete('/cart/:userId/:itemId', cartController.delete_item);
*/

export default router;