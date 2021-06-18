import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema({
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
            min: [1, 'Cantidad no puede ser menor que 1.'],
            deafult: 1
        },
        precio: Number
    }],
    importe: {
        type: Number,
        required: true,
        default: 0
    }
});

export default mongoose.model("Pedido", pedidoSchema);