import mongodb from "mongodb"
const ObjectId = mongodb.ObjectID

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
                query = { $text: { $search: filtros["nombre_producto"] } } //Configurar mongodb 
            }
            else if ("categoria" in filtros) {
                query = { "categoria": { $eq: filtros["categoria"] } }
            }/*
            else if ("zipcode" in filtros) {
                query = { "address.zipcode": { $eq: filtros["zipcode"] } } 
            }*/
        }

        let cursor
        try {
            cursor = await productos.find(query)
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return { listaProductos: [], totalProductos: 0 }
        }

        const displayCursor = cursor.limit(productosPorPagina).skip(productosPorPagina * pag)

        try {
            const listaProductos = await displayCursor.toArray()
            const totalProductos = await productos.countDocuments(query)

            return { listaProductos, totalProductos }
        } catch (e) {
            console.error(`Unable to convert cursor to array or problem counting documents, ${e}`)
            return { listaProductos: [], totalProductos: 0 }
        }
    }

    static async getProductoPorId(id) {
        try {
            const query = {_id: new ObjectId(id),}
            return await productos.findOne(query)
            /*
            return await productos.findOne({
                $match: {
                    _id: new ObjectId(id),
                },
            })
            */
        } catch (e) {
            console.error(`Something went wrong in getProductosPorId: ${e}`)
            throw e
        }
    }

    static async getCategorias() {
        let categorias = []
        try {
            categorias = await productos.distinct("categoria")
            return categorias
        } catch (e) {
            console.error(`Unable to get categorias: ${e}`)
            return categorias
        }
    }
}