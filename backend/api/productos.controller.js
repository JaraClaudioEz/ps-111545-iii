import ProductosDAO from "../dao/productosDAO.js"

export default class ProductosController {
    static async apiGetProductos(req, res, next) {
        
        const productosPorPagina = req.query.productosPorPagina ? parseInt(req.productosPorPagina, 10) : 20
        const pag = req.query.pag ? parseInt(req.query.pag, 10) : 0
        
        let filtros = {}
        if (req.query.categoria) {
            filtros.categoria = req.query.categoria
        }
        else if (req.query.nombre_producto) {
            filtros.nombre_producto = req.query.nombre_producto
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
                res.status(404).json({ error: "Not found" })
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
}