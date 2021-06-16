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
                googleId: "No Tiene",
                nombre: `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`,
                email: nuevoUsuario.email,
                password: hashedPassword,
                tipo: "cliente",
                direccion: {
                    calle: "",
                    numero: null,
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

    static async apiSaveUsuarioGoogle(req, res, next) {
        const nuevoUsuario = req.body;

        try {
            const usuarioExistente = await Usuario.findOne({ email: nuevoUsuario.email });
            if (usuarioExistente) {
                return res.status(400).json({ message: "El usuario ya existe." });
            };

            const rand = Math.random().toString(16).substr(2, 16);

            const usuario = {
                googleId: nuevoUsuario.googleId,
                nombre: nuevoUsuario.nombre,
                email: nuevoUsuario.email,
                password: rand,
                tipo: "cliente",
                direccion: {
                    calle: "",
                    numero: null,
                    localidad: ""
                },
                telefono: null
            }

            const result = await Usuario.create(usuario)

            res.status(200).json({ message: "Creado", idGoogle: nuevoUsuario.googleId });
        } catch (error) {
            res.status(500).json({ message: "Algo anduvo mal al registrarse.", error: error });
        }
    }

    static async apiGetUsuarios(req, res, next) {

        const usuariosPorPagina = req.query.usuariosPorPagina ? parseInt(req.usuariosPorPagina, 10) : 20
        const pag = req.query.pag ? parseInt(req.query.pag, 10) : 0

        let filtros = {};
        filtros.tipo = "cliente";
        if (req.query.nombre) {
            filtros.nombre = req.query.nombre
        }
        /*
        const { listaUsuarios, totalUsuarios } = await ProductosDAO.getProductos({
            filtros,
            pag,
            usuariosPorPagina,
        })
        
        static async getProductos({

            filtros = null,
            pag = 0,
            productosPorPagina = 20,
        } = {}) {
        */
        let query
        if (filtros) {
            if ("nombre" in filtros) {
                query = { $text: { $search: filtros["nombre"] }, "tipo": "cliente" } //Configurado en mongodb 
            }
            else if ("tipo" in filtros) {
                query = { "tipo": "cliente" }
            }
        }

        try {
            const listaUsuarios = await Usuario.find(query, { password: 0, googleId: 0 }).limit(usuariosPorPagina).skip(usuariosPorPagina * pag)
            const totalUsuarios = await Usuario.countDocuments(query)

            let response = {
                usuarios: listaUsuarios,
                pagina: pag,
                filtros: filtros,
                entradas_por_pagina: usuariosPorPagina,
                total_resultados: totalUsuarios,
            }
            return res.status(200).json(response)
        } catch (e) {
            console.error(`No se pudo traer listado productos, ${e}`)
            return { listaUsuarios: [], totalUsuarios: 0 }
        }

    }


    static async apiGetUsuarioPorEmail(req, res, next) {

        const email = req.params.email || {}

        try {

            const usuario = await Usuario.findOne({ email });
            if (!usuario) {
                return res.status(404).json({ message: "El usuario no existe." });
            };

            res.json(usuario)
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e })
        }
    }

    static async apiUpdateUsuario(req, res, next) {
        const updatedUsuario = req.body;
        const idUsuario = req.body._id;

        try {
            const { _id, ...usuario } = updatedUsuario;

            const resultado = await Usuario.updateOne(
                { _id: idUsuario },
                { $set: usuario },
            );

            if (resultado.nModified === 0) {
                res.json({ status: "Sin cambios", id: idUsuario });
            }
            else {
                const token = jwt.sign({ email: usuario.email, id: usuario._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

                res.status(200).json({ result: updatedUsuario, token });
            }
        } catch (error) {
            res.status(500).json({ message: "Algo anduvo mal al actualizar usuario.", error: error });
        }
    }

    static async apiDeleteUsuario(req, res, next) {
        try {
            const idUsuario = req.query.id
            
            const deleteResponse = await Usuario.deleteOne({_id: idUsuario})
            
            res.json({ status: "Eliminado", id: idUsuario })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetUsuarioById(req, res, next) {
        const id = req.params.id || {}
        
        try {

            const usuario = await Usuario.findOne({ _id: id });
            if (!usuario) {
                return res.status(404).json({ message: "El usuario no existe." });
            };

            res.json(usuario)
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e })
        }
    }

}