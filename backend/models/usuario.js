import mongoose from "mongoose";

const usuarioSchema = mongoose.Schema({
    id: { type: String},
    nombre: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
});

export default mongoose.model("Usuario", usuarioSchema);

