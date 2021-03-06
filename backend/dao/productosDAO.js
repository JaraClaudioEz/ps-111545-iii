import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

import Producto from "../models/producto.js";

let productos

export default class ProductosDAO {
    static async injectDB(conn) {
        if (productos) {
            return
        }
        try {
            productos = await conn.db(process.env.RESTIMPRENTA_NS).collection("productos")
        } catch (e) {
            console.error(`Unable to stablish a collection handle in ProductosDAO: ${e}`)
        }
    }

    static async getProductos({

        filtros = null,
        pag = 0,
        productosPorPagina = 20,
    } = {}) {

        let query
        if (filtros) {
            if ("nombre_producto" in filtros) {
                query = { $text: { $search: filtros["nombre_producto"] } } //Configurado en mongodb 
            }
            else if ("categoria" in filtros) {
                query = { "categoria": { $eq: filtros["categoria"] } }
            }
        }
        /*
        let cursor
        try {
            cursor = await Producto.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { listaProductos: [], totalProductos: 0 }
        }

        const displayCursor = cursor.limit(productosPorPagina).skip(productosPorPagina * pag)

        try {
            const listaProductos = await displayCursor.toArray()
            const totalProductos = await Producto.countDocuments(query)

            return { listaProductos, totalProductos }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { listaProductos: [], totalProductos: 0 }
        }
        */
        try {
            const listaProductos = await Producto.find(query).limit(productosPorPagina).skip(productosPorPagina * pag)
            const totalProductos = await Producto.countDocuments(query)

            return { listaProductos, totalProductos }
        } catch (e) {
            console.error(`No se pudo traer listado productos, ${e}`)
            return { listaProductos: [], totalProductos: 0 }
        }

    }

    static async getProductoPorId(id) {
        try {
            const query = { _id: ObjectId(id), }
            return await Producto.findOne(query)

        } catch (e) {
            console.error(`Something went wrong in getProductosPorId: ${e}`)
            throw e
        }
    }

    static async addProducto(nuevoProducto) {
        try {
            return await Producto.create(nuevoProducto)
        } catch (e) {
            console.error(`Unable to post producto: ${e}`)
            return { error: e }
        }
    }

    static async updateProducto(idProducto, producto) {
        try {
            
            const { _id, ...updatedProducto } = producto

            const updateResponse = await Producto.updateOne(
                { _id: ObjectId(idProducto) },
                { $set: updatedProducto },
            )

            return updateResponse
        } catch (e) {
            console.error(`Unable to update producto: ${e}`)
            return { error: e }
        }
    }

    static async deleteProducto(idProducto) {

        try {
            const deleteResponse = await Producto.deleteOne({ _id: ObjectId(idProducto) })

            return deleteResponse
        } catch (e) {
            console.error(`Unable to delete producto: ${e}`)
            return { error: e }
        }
    }

    static async getCategorias() {
        let categorias = []
        try {
            categorias = await Producto.distinct("categoria")
            return categorias
        } catch (e) {
            console.error(`Unable to get categorias: ${e}`)
            return categorias
        }
    }
}