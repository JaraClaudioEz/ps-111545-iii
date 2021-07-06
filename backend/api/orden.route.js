import express from "express";

import OrdenCtrl from "./ordenes.controller.js";
import autorizacion from "../middleware/autorizacion.js"

const router = express.Router();

router.route("/")
    .get(autorizacion, OrdenCtrl.apiGetOrdenes)
    .put(autorizacion, OrdenCtrl.apiUpdateOrden)
    .delete(autorizacion, OrdenCtrl.apiDeleteOrden)

router.route("/estados").get(autorizacion, OrdenCtrl.apiGetEstados)
router.route("/:id")
    .get(autorizacion, OrdenCtrl.apiGetOrdenesUsuario)
    .post(autorizacion, OrdenCtrl.apiCheckout)
    
router.route("/mp").post(autorizacion, OrdenCtrl.apiGetIPNMP)
router.route("/id/:id").get(autorizacion, OrdenCtrl.apiGetOrden)


export default router;
