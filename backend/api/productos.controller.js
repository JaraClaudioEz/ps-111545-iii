import ProductosDAO from "../dao/productosDAO.js"
//import cloudinary from "../utils/cloudinary.config.js"
//import upload from "../utils/multer.js"

//const cloudinary = require('../utils/cloudinary.config');
//const upload = require("../utils/multer").default;

export default class ProductosController {
    static async apiGetProductos(req, res, next) {

        const productosPorPagina = req.query.productosPorPagina ? parseInt(req.productosPorPagina, 10) : 20
        const pag = req.query.pag ? parseInt(req.query.pag, 10) : 0

        let filtros = {}
        if (req.query.categoria) {
            filtros.categoria = req.query.categoria
        }
        else if (req.query.nombre) {
            filtros.nombre_producto = req.query.nombre
        }

        const { listaProductos, totalProductos } = await ProductosDAO.getProductos({
            filtros,
            pag,
            productosPorPagina,
        })

        let response = {
            productos: listaProductos,
            pagina: pag,
            filtros: filtros,
            entradas_por_pagina: productosPorPagina,
            total_resultados: totalProductos,
        }
        res.json(response)
    }

    static async apiGetProductoPorId(req, res, next) {
        try {
            let id = req.params.id || {} //A query is after a ?, a param is after a / and body is in the body of the request
            let producto = await ProductosDAO.getProductoPorId(id)
            if (!producto) {
                res.status(404).json({ error: "No se encontró" })
                return
            }
            res.json(producto)
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e })
        }
    }

    static async apiGetCategoriasProducto(req, res, next) {
        try {
            let categorias = await ProductosDAO.getCategorias()
            res.json(categorias)
        } catch (e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e })
        }
    }

    static async apiPostProducto(req, res, next) {
        try {
            const nuevoProducto = req.body
            /*
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()
            */
            const respuestaProducto = await ProductosDAO.addProducto(nuevoProducto)
            res.json({ status: "Agregado", id: respuestaProducto.insertedId })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiUpdateProducto(req, res, next) {
        try {
            const idProducto = req.body._id
            const producto = req.body

            const respuestaProducto = await ProductosDAO.updateProducto(idProducto, producto)
            /*
            var { error } = respuestaProducto
            if (error) {
                res.status(400).json({ error })
            }
            
            if (respuestaProducto.modifiedCount === 0) {
                throw new Error(
                    error = "Sin cambios",
                )
            }
            */

            if (respuestaProducto.modifiedCount === 0) {
                res.json({ status: "Sin cambios", id: idProducto })
            }
            else {
                res.json({ status: "Modificado", id: idProducto })
            }

        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    static async apiDeleteProducto(req, res, next) {
        try {
            const idProducto = req.query.id
            //console.log(idProducto)
            const respuestaProducto = await ProductosDAO.deleteProducto(idProducto)
            res.json({ status: "Eliminado", id: idProducto })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }

    /*
    static async apiPostImagen(req, res, next) {
        try {
            
            console.log(req.file);
            const result = await cloudinary.uploader.upload(req.file);

            const imagen = {
                url: result.secure_url,
                id: result.public_id
            }

            res.json({ status: "Imagen cargada.", data: imagen })
        } catch (e) {
            res.status(500).json({ error: e.message })
        }
    }
    */
}