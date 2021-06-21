import express from "express";

import OrdenCtrl from "./ordenes.controller.js";
import autorizacion from "../middleware/autorizacion.js"

const router = express.Router();

router.route("/:id")
    .get(autorizacion, OrdenCtrl.apiGetOrdenes)
    .post(autorizacion, OrdenCtrl.apiCheckout)

/*
router.get('/order/:id',orderController.get_orders);
router.post('/order/:id',orderController.checkout);
*/

export default router;
