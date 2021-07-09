import express from "express";

import ReporteCtrl from "../api/reportes.controller.js";
import autorizacion from "../middleware/autorizacion.js";

const router = express.Router();

router.route("/").get(autorizacion, ReporteCtrl.apiGetTotalVentasPorPeriodo)
router.route("/porProducto").get(autorizacion, ReporteCtrl.apiGetCantidadesVendidasProductos)
router.route("/porCategoria").get(autorizacion, ReporteCtrl.apiGetVentasPorCategoria)

export default router;