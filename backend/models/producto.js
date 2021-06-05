import mongoose from "mongoose";

const productoSchema = mongoose.Schema({
    id: { type: String},
    nombre_producto: { type: String, required: true},
    categoria: { type: String, required: true},
    descripcion: { type: String },
    especificaciones: { type: String },
    provision: { type: String, required: true},
    precio: { type: Number, required: true},
    provision: { type: String, required: true},
    imagen: { 
        url: { type: String },
        id: { type: String }
    },
    oferta: { type: Boolean },
    precio_oferta: { type: Number },
});

export default mongoose.model("Producto", productoSchema);
