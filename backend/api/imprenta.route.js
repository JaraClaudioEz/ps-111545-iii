import express from "express"
import ProductosCtrl from "./productos.controller.js"
//import ReviewsCtrl from "./imagenes.controller.js"

const router = express.Router()

router.route("/productos")
    .get(ProductosCtrl.apiGetProductos)
    .post(ProductosCtrl.apiPostProducto)
    .put(ProductosCtrl.apiUpdateProducto)
    .delete(ProductosCtrl.apiDeleteProducto)

router.route("/productos/id/:id").get(ProductosCtrl.apiGetProductoPorId)
router.route("/categorias").get(ProductosCtrl.apiGetCategoriasProducto)

//router.route("/imagenes")
//    .post(ProductosCtrl.apiPostImagen)



export default router