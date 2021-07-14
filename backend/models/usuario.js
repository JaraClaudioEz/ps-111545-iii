import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    id: { type: String },
    googleId: { type: String },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tipo: { type: String, required: true, default: "cliente" },
    direccion: {
        calle: { type: String },
        numero: { type: Number },
        localidad: { type: String }
    },
    telefono: { type: Number },
    verificado: {type: Boolean, required: true, default: false},
    stringVerif: {type: String}
});

export default mongoose.model("Usuario", usuarioSchema);

