import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Usuario from "../models/usuario.js";

export default class UsuariosController {

    static async apiSigninUsuario(req, res, next) {

        const { email, password } = req.body;

        try {
            const usuarioExistente = await Usuario.findOne({ email });
            if (!usuarioExistente) {
                return res.status(404).json({ message: "El usuario no existe." });
            };

            const passCorrecta = await bcrypt.compare(password, usuarioExistente.password);
            if (!passCorrecta) {
                return res.status(400).json({ message: "Credenciales no válidas." });
            }

            const token = jwt.sign({ email: usuarioExistente.email, id: usuarioExistente._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

            res.status(200).json({ result: usuarioExistente, token });
        } catch (error) {
            res.status(500).json({ message: "Algo anduvo mal al iniciar sesión." });
        }

    }

    static async apiSignupUsuario(req, res, next) {

        const nuevoUsuario = req.body;

        try {
            const usuarioExistente = await Usuario.findOne({ email: nuevoUsuario.email });
            if (usuarioExistente) {
                return res.status(400).json({ message: "El usuario ya existe." });
            };

            if (nuevoUsuario.password !== nuevoUsuario.confirmPass) {
                return res.status(400).json({ message: "Las contraseñas no coinciden." });
            }

            const hashedPassword = await bcrypt.hash(nuevoUsuario.password, 12);

            const usuario = {
                nombre: `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`,
                email: nuevoUsuario.email,
                password: hashedPassword,
                tipo: "cliente",
                direccion: {
                    calle: "",
                    numero: "",
                    localidad: ""
                },
                telefono: null
            }
            const result = await Usuario.create(usuario)
            //const result = await Usuario.create({ email, password: hashedPassword, nombre: `${nombre} ${apellido}` })
            const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

            res.status(200).json({ result, token });
        } catch (error) {
            res.status(500).json({ message: "Algo anduvo mal al registrarse.", error: error });
        }

    }

    static async apiGetUsuario(req, res, next) {

    }

    static async apiUpdateUsuario(req, res, next) {
        const updatedUsuario = req.body;
        const idUsuario = req.body._id
        
        try {
            const { _id, ...usuario } = updatedUsuario

            const result = await Producto.updateOne(
                { _id: ObjectId(idUsuario) },
                { $set: usuario },
            )

            if (result.modifiedCount === 0) {
                res.json({ status: "Sin cambios", id: idUsuario })
            }
            else {
                res.status(200).json({ status: "Modificado", id: idUsuario })
            }
        } catch (error) {
            
        }
    }

    static async apiDeleteUsuario(req, res, next) {

    }

    static async apiGetUsuarioById(req, res, next) {

    }

}