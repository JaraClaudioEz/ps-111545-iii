import mongoose from "mongoose";

const ordenSchema = mongoose.Schema({
    idUsuario: {
        type: String,
        required: true
    },
    preferenceId: {
        type: String
    },
    items: [{
        idProducto: {
            type: String,
        },
        nombre: String,
        cantidad: {
            type: Number,
            required: true,
            min: [1, 'Cantidad no puede ser menor que 1.']
        },
        precio: Number
    }],
    factura: {
        type: Number,
        required: true
    },
    fecha: {
        type: Date,
        default: Date.now
    },
    estado: {
        type: String,
        default: "pagada"
    }
})

export default mongoose.model("Orden", ordenSchema);