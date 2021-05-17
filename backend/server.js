import express from "express"
import cors from "cors"
import imprenta from "./api/imprenta.route.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/imprenta", imprenta)
app.use("*", (req, res) => res.status(404).json({ error: "Página no encontrada"}))

export default app