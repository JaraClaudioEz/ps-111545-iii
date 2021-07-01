import express from "express";

import OrdenCtrl from "./ordenes.controller.js";
import autorizacion from "../middleware/autorizacion.js"

const router = express.Router();

router.route("/").get(autorizacion, OrdenCtrl.apiGetOrdenes)
router.route("/:id")
    .get(autorizacion, OrdenCtrl.apiGetOrdenesUsuario)
    .post(autorizacion, OrdenCtrl.apiCheckout)
router.route("/mp").post(OrdenCtrl.apiGetIPNMP)


export default router;
