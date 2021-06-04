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

            const token = jwt.sign({ email: usuarioExistente.email, id: usuarioExistente._id }, 'secretdeprueba', { expiresIn: "1h" });

            res.status(200).json({ result: usuarioExistente, token });
        } catch (error) {
            res.status(500).json({ message: "Algo anduvo mal al iniciar sesión." });
        }

    }

    static async apiSignupUsuario(req, res, next) {

        const { email, password, confirmPass, nombre, apellido } = req.body;

        try {
            const usuarioExistente = await Usuario.findOne({ email });
            if (usuarioExistente) {
                return res.status(400).json({ message: "El usuario ya existe." });
            };

            if (password !== confirmPass) {
                return res.status(400).json({ message: "Las contraseñas no coinciden." });
            }

            const hashedPassword = await bcrypt.hash(password, 12);

            const result = await Usuario.create({ email, password: hashedPassword, nombre: `${nombre} ${apellido}` })
            const token = jwt.sign({ email: result.email, id: result._id }, 'secretdeprueba', { expiresIn: "1h" });

            res.status(200).json({ result, token });
        } catch (error) {
            res.status(500).json({ message: "Algo anduvo mal al registrarse." });
        }

    }

    static async apiGetUsuario(req, res, next) {

    }

    static async apiPutUsuario(req, res, next) {

    }

    static async apiDeleteUsuario(req, res, next) {

    }

    static async apiGetUsuarioById(req, res, next) {

    }

}