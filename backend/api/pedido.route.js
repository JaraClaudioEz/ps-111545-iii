import express from "express";

import PedidoCtrl from "./pedidos.controller.js";
import autorizacion from "../middleware/autorizacion.js"

const router = express.Router();

router.route("/:idUsuario")
    .get(autorizacion, PedidoCtrl.apiGetItemsPedido)
    .post(autorizacion, PedidoCtrl.apiAddItemPedido)
    .delete(autorizacion, PedidoCtrl.apiVaciarPedido)

router.route("/:idUsuario/:id").delete(autorizacion, PedidoCtrl.apiDeleteItemPedido)

export default router;