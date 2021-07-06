import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";
import Orden from "../models/orden.js";

export default class ReportesController {
    static async apiGetTotalVentasPorPeriodo(req, res, next) {
        //console.log(req.query);
        let formato = '';
        switch (req.query.formatoFecha) {
            case 'year':
                formato = "%Y";
                break;
            case 'month':
                formato = "%Y-%m";
                break;
            default:
                formato = "%Y-%m-%d";
                break;
        }

        var pipeline = [
            {
                $group: {
                    _id: { $dateToString: { format: formato, date: "$fecha" } },
                    //_id: "$fecha",
                    totalVentas: {
                        $sum: "$factura"
                    }
                }
            }
        ];

        try {
            const ordenes = await Orden.aggregate(pipeline).sort({ _id: 1 });
            //console.log(ordenes);

            if (ordenes.length > 0) {
                res.status(200).json({ ordenes });
            }
            else {
                res.status(200).json(null);
            };


        } catch (error) {
            console.log(error);
        }

    }
}