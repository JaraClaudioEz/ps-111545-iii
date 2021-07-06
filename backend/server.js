import express from "express"
import cors from "cors"

import imprenta from "./api/imprenta.route.js"
import imagen from "./api/imagen.route.js"
import usuario from "./api/usuario.route.js"
import pedido from "./api/pedido.route.js"
import orden from "./api/orden.route.js"
import reporte from "./api/reporte.route.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/imprenta", imprenta)
app.use("/api/v1/imprenta/imagenes", imagen)
app.use("/api/v1/imprenta/usuarios", usuario)
app.use("/api/v1/imprenta/pedidos", pedido)
app.use("/api/v1/imprenta/ordenes", orden)
app.use("/api/v1/imprenta/reportes", reporte)
app.use("*", (req, res) => res.status(404).json({ error: "Página no encontrada"}))

export default app