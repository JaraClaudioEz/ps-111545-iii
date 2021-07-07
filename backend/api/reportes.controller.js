import Pedido from "../models/pedido.js";
import Usuario from "../models/usuario.js";
import Orden from "../models/orden.js";
import Producto from "../models/producto.js";

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

    static async apiGetCantidadesVendidasProductos(req, res, next) {

        //console.log(req.query);
        let filtro = '';
        if (req.query.return === 'ventas') {
            filtro = { venta_total: -1 };
        }
        else {
            filtro = { cantidad_total: -1 };
        }

        var pipeline = [
            {
                $unwind: {
                    path: "$items",
                }
            },
            /*
            {$match: {
              "items.precio": {
                $gt: NumberDecimal("1000.00"),
              },
            }},
            */
            // Group by product type, capturing each product's total value + quantity
            {
                "$group": {
                    "_id": "$items.idProducto",
                    //"product": {"$first": "$products.name"},
                    "venta_total": { "$sum": "$items.precio" },
                    "cantidad_total": { "$sum": "$items.cantidad" },
                }
            },

            // Set product id to be the value of the field that was grouped on
            {
                "$set": {
                    "idProducto": "$_id",
                }
            },

            // Omit unwanted fields
            {
                "$unset": [
                    "_id",
                ]
            },
        ];

        try {
            const productos = await Orden.aggregate(pipeline).sort(filtro).limit(15);

            let ids = [];
            productos.map(prod => {
                ids.push(prod.idProducto);
            });

            const nombres = await Producto.find({ '_id': { $in: ids } }).select('nombre_producto');
            //console.log(nombres);

            if (productos.length > 0) {
                res.status(200).json({ productos, nombres });
            }
            else {
                res.status(200).json(null);
            };

            //console.log(productos);
        } catch (error) {
            console.log(error);
        }
    };
}