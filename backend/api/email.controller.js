//require('dotenv').config();
import mailer from 'nodemailer';

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
    }
})

transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Servidor listo para recibir emails: ");
    }
});

export default class MailerController {

    static async sendOrdenLista(para) {
        let mensaje = {
            from: 'integral.imagen.test@gmail.com',
            to: para,
            subject: 'Orden Lista!',
            html: '<h4>Tu orden de compra está lista para que pases a retirar por nuestro local</h4><br>',
        }

        transporter.sendMail(mensaje, (err, result) => {
            if (err) {
                console.log(err);
                return false
            }

            console.log("Email enviado: ", result);
        })
    }

    static async sendNuevaOrden(cliente, importe, productos) {
        let mensaje = {
            from: 'integral.imagen.test@gmail.com',
            to: 'integral.imagen.test@gmail.com',
            subject: 'Nueva Compra! Orden N°xxxx',
            html: `<h4>Ingresó una nueva orden de trabajo del cliente ${cliente} </h4><br>`,
        }

        transporter.sendMail(mensaje, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            //console.log("Email enviado");
            //console.log("Email enviado: ", result);
        })
    }
}