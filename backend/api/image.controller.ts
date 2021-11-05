const Instagram = require('instagram-web-api')

export default class ProductosController {
    static async apiGetImagenesIG(req, res, next) {

        try {

            const usuarioIg = process.env.INSTAGRAM_USER;
            const passIg = process.env.INSTAGRAM_PASSWORD;

            const client = new Instagram({ usuarioIg, passIg })

            client
                .login()
                .then(() => {
                    client
                        .getProfile()
                        .then(console.log)
                })
            
            //res.json(categorias)
        } catch (e) {
            console.log(`No se pudo obtener imagenes de Instagram: ${e}`);
            res.status(500).json({ error: e })
        }
    }

}