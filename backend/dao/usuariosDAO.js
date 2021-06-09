//DEPRECATED
import mongodb from "mongodb"
//const ObjectId = mongodb.ObjectID

let usuarios

export default class UsuariosDAO {
    static async injectDB(conn) {
        if (usuarios) {
            return
        }
        try {
            usuarios = await conn.db(process.env.RESTIMPRENTA_NS).collection("usuarios")
        } catch (e) {
            console.error(`Unable to stablish a collection handle in UsuariosDAO: ${e}`)
        }
    }
}