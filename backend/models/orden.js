import mongoose from "mongoose";

const ordenSchema = mongoose.Schema({
    idUsuario: {
        type: String,
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
    }
})

export default mongoose.model("Orden", ordenSchema);