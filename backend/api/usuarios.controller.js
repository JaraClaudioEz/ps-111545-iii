import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Usuario from "../models/usuario.js";
import Emailer from "./email.controller.js";

export default class UsuariosController {

    static async apiSigninUsuario(req, res, next) {

        const { email, password } = req.body;

        try {
            const usuarioExistente = await Usuario.findOne({ email }, { stringVerif: 0 });
            if (!usuarioExistente) {
                return res.status(404).json({ message: "El usuario no existe." });
            };

            const passCorrecta = await bcrypt.compare(password, usuarioExistente.password);
            if (!passCorrecta) {
                return res.status(400).json({ message: "Credenciales no válidas." });
            }

            const token = jwt.sign({ email: usuarioExistente.email, id: usuarioExistente._id }, process.env.SECRET_TOKEN, { expiresIn: "2h" });

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

            const randomString = () => {
                const len = 12;
                let randStr = '';
                for (let i = 0; i < len; i++) {
                    const char = Math.floor((Math.random() * 10) + 1);
                    randStr += char;
                }
                return randStr;
            };

            const usuario = {
                googleId: "No Tiene",
                nombre: `${nuevoUsuario.nombre} ${nuevoUsuario.apellido}`,
                email: nuevoUsuario.email,
                password: hashedPassword,
                direccion: {
                    calle: "",
                    numero: null,
                    localidad: ""
                },
                telefono: "",
                stringVerif: randomString()
            }
            const result = await Usuario.create(usuario)
            //const result = await Usuario.create({ email, password: hashedPassword, nombre: `${nombre} ${apellido}` })
            //const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

            Emailer.verificarUsuario(usuario.email, usuario.stringVerif)
                .then(result => {
                    res.status(200).json({ status: true })
                })
            //res.status(200).json({ result, token });
        } catch (error) {
            res.status(500).json({ message: "Algo anduvo mal al registrarse.", error: error });
        }

    }

    static async apiVerificarUsuario(req, res, next) {

        const { stringVerif } = req.params || {}

        try {

            const usuario = await Usuario.findOne({ stringVerif: stringVerif }, { stringVerif: 0 });
            if (usuario) {
                usuario.verificado = true;
                const result = await usuario.save();
                const token = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" });

                res.redirect('http://localhost:3000/autorizacion');
                //res.status(200).json({ result, token });
            }
            else {
                res.status(404).json({ message: "Usuario no encontrado." });
            }


        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e })
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
                direccion: {
                    calle: "",
                    numero: null,
                    localidad: ""
                },
                telefono: "",
                verificado: true
            }

            const result = await Usuario.create(usuario)
            //console.log(result);
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
            const listaUsuarios = await Usuario.find(query, { password: 0, googleId: 0, stringVerif: 0 }).limit(usuariosPorPagina).skip(usuariosPorPagina * pag)
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
            console.error(`No se pudo traer listado usuarios, ${e}`)
            return { listaUsuarios: [], totalUsuarios: 0 }
        }

    }


    static async apiGetUsuarioPorEmail(req, res, next) {


        const email = req.params.email || {}

        try {

            const usuario = await Usuario.findOne({ email }, { stringVerif: 0 });
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

            const deleteResponse = await Usuario.deleteOne({ _id: idUsuario })

            res.json({ status: "Eliminado", id: idUsuario })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiGetUsuarioById(req, res, next) {

        const id = req.params.id || {}

        try {

            const usuario = await Usuario.findOne({ _id: id }, { stringVerif: 0 });
            if (!usuario) {
                return res.status(404).json({ message: "El usuario no existe." });
            };

            res.json(usuario)
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e })
        }
    }

    static async apiEnviarConsulta(req, res, next) {
        //console.log(req.body);
        const mensaje = req.body;

        try {

            if (!mensaje.texto) {
                return res.status(404).json({ status: 'empty' });
            };
            Emailer.sendConsulta(mensaje.email, mensaje.asunto, mensaje.texto)
                .then(result => {
                    res.status(200).json({ status: 'enviado' })
                })
            
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e })
        }
    }

}