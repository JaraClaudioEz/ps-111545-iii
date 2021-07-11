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

    static async sendOrdenLista(email, nombre) {
        let mensaje = {
            from: 'integral.imagen.test@gmail.com',
            to: email,
            subject: 'Orden Lista!',
            html: `<head>Hola! ${nombre} </head><body><h4>Tu orden de compra N°xxxx está lista para retirar.<p>Te invitamos a llegar por nuestro local en Tucumán 544 de lunes a viernes 8 a 13 hs y 16 a 20hs</p></h4></body><br>`,
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
            
            html: `<head>Ingresó una nueva orden de trabajo para el cliente ${cliente} </head><body><h4>Items de la orden: `  
            + `<ul> ${productos.map(prod => `<li>${prod.nombre}, cantidad ${prod.cantidad}</li>`)}</ul>` 
            + `<p>Total compra $ ${importe}</p></h4></body><br>`,
            
        }

        transporter.sendMail(mensaje, (err, result) => {
            if (err) {
                console.log(err);
                return false;
            }
            console.log("Email enviado");
            //console.log("Email enviado: ", result);
        })
    }
}