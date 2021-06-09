import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    id: { type: String },
    nombre: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tipo: { type: String, required: true },
    direccion: {
        calle: { type: String },
        numero: { type: Number },
        localidad: { type: String }
    },
    telefono: { type: Number }
});

export default mongoose.model("Usuario", usuarioSchema);

