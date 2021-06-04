import express from "express"
import cors from "cors"
import imprenta from "./api/imprenta.route.js"
import imagen from "./api/imagen.route.js"
import usuario from "./api/usuario.route.js"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/imprenta", imprenta)
app.use("/api/v1/imprenta/imagenes", imagen)
app.use("/api/v1/imprenta/usuarios", usuario)
app.use("*", (req, res) => res.status(404).json({ error: "Página no encontrada"}))

export default app