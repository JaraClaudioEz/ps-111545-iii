import express from "express"
import ProductosCtrl from "./productos.controller.js"
import autorizacion from "../middleware/autorizacion.js"

const router = express.Router()

router.route("/productos")
    .get(ProductosCtrl.apiGetProductos)
    .post(autorizacion, ProductosCtrl.apiPostProducto)
    .put(autorizacion, ProductosCtrl.apiUpdateProducto)
    .delete(autorizacion, ProductosCtrl.apiDeleteProducto)

router.route("/productos/id/:id").get(ProductosCtrl.apiGetProductoPorId)
router.route("/categorias").get(ProductosCtrl.apiGetCategoriasProducto)


export default router