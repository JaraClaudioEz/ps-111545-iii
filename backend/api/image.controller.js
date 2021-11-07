import Instagram from 'instagram-web-api';
import https from 'https';
import axios from 'axios';

export default class ImagenesController {
    static async apiGetImagenesIG(req, res, next) {

        try {

            const usuarioIg = process.env.INSTAGRAM_USER;
            const passIg = process.env.INSTAGRAM_PASSWORD;

            const client = new Instagram({ usuarioIg, passIg })

            await client.login()
            const profile = await client.getProfile()

            console.log(profile)

            //res.json(categorias)
        } catch (e) {
            console.log(`No se pudo obtener imagenes de Instagram: ${e}`);
            res.status(500).json({ error: e })
        }
    }

    static async apiGetPostIG(req, res, next) {

        try {
            /*
            https.get(`https://graph.instagram.com/me?fields=id,username&access_token=${process.env.IG_TOKEN}`, (res) => {
                console.log('statusCode:', res.statusCode);
                console.log('headers:', res.headers);
                
                //{"id":"4742478392450672","username":"j3zequiel"}
                //res.json(resp);

            });
            */
            axios.get(`https://graph.instagram.com/me/media?fields=id,media_type,permalink,media_url&access_token=${process.env.IG_TOKEN}`)
                .then(resp => {
                    const headerDate = resp.headers && resp.headers.date ? resp.headers.date : 'no response date';
                    //console.log('Status Code:', resp.status);
                    //console.log('Date in Response header:', headerDate);

                    const fotos = resp.data;

                    //console.log(fotos.data);
                    res.status(200).json(fotos.data)
                })
                .catch(err => {
                    console.log('Error: ', err.message);
                });
            
        } catch (e) {
            console.log(`No se pudo obtener imagenes de Instagram: ${e}`);
            res.status(500).json({ error: e })
        }
    }

}
