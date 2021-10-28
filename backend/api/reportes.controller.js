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

        var pipeline = [];

        if (!req.query.desde) {
            pipeline = [
                {
                    $group: {
                        _id: { $dateToString: { format: formato, date: "$fecha" } },
                        //_id: "$fecha",
                        totalVentas: {
                            $sum: "$factura"
                        }
                    },
                }
            ];
        }
        else {
            pipeline = [
                {
                    $group: {
                        _id: { $dateToString: { format: formato, date: "$fecha" } },
                        //_id: "$fecha",
                        totalVentas: {
                            $sum: "$factura"
                        }
                    },
                },
                {
                    $match: {
                        _id: {
                            $gte: req.query.desde,
                            $lt: req.query.hasta + 1
                        }
                    }
                }
            ];
        }


        try {
            const ordenes = await Orden.aggregate(pipeline).sort({ _id: -1 }).limit(15);
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
                    "producto": { "$first": "$items.nombre" },
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

            /*
            let ids = [];
            productos.map(prod => {
                ids.push(prod.idProducto);
            });

            const nombres = await Producto.find({ '_id': { $in: ids } }).select('nombre_producto');
            //console.log(nombres);
            */
            if (productos.length > 0) {
                res.status(200).json({ productos });
            }
            else {
                res.status(200).json(null);
            };

            //console.log(productos);
        } catch (error) {
            console.log(error);
        }
    };

    static async apiGetVentasPorCategoria(req, res, next) {
        //console.log(req.query);
        /*
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
        */

        var pipeline1 = [
            {
                $unwind: {
                    path: "$items",
                }
            },

            {
                "$match": {
                    "items.categoria": {
                        "$eq": "Imprenta",
                    },
                }
            },

            {
                "$group": {
                    "_id": { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
                    "categoria": { "$first": "$items.categoria" },
                    "venta": { "$sum": "$items.precio" },
                    "cantidad_total": { "$sum": "$items.cantidad" },
                    venta_total: { $sum: { $multiply: ["$items.precio", "$items.cantidad"] } }
                }
            },

            {
                "$set": {
                    "fecha": "$_id",
                }
            },

            {
                "$unset": [
                    "_id",
                ]
            },

        ];

        var pipeline2 = [
            {
                $unwind: {
                    path: "$items",
                }
            },

            {
                "$match": {
                    "items.categoria": {
                        "$eq": "Estampado",
                    },
                }
            },

            {
                "$group": {
                    "_id": { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
                    "categoria": { "$first": "$items.categoria" },
                    "venta": { "$sum": "$items.precio" },
                    "cantidad_total": { "$sum": "$items.cantidad" },
                    venta_total: { $sum: { $multiply: ["$items.precio", "$items.cantidad"] } }
                }
            },

            {
                "$set": {
                    "fecha": "$_id",
                }
            },

            {
                "$unset": [
                    "_id",
                ]
            },
        ];

        var pipeline3 = [
            {
                $unwind: {
                    path: "$items",
                }
            },

            {
                "$match": {
                    "items.categoria": {
                        "$eq": "Cartelería",
                    },
                }
            },

            {
                "$group": {
                    "_id": { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
                    "categoria": { "$first": "$items.categoria" },
                    "venta": { "$sum": "$items.precio" },
                    "cantidad_total": { "$sum": "$items.cantidad" },
                    venta_total: { $sum: { $multiply: ["$items.precio", "$items.cantidad"] } }
                }
            },

            {
                "$set": {
                    "fecha": "$_id",
                }
            },

            {
                "$unset": [
                    "_id",
                ]
            },
        ];

        try {

            const imprenta = await Orden.aggregate(pipeline1).sort({ fecha: 1 });
            //console.log(imprenta);
            const estampado = await Orden.aggregate(pipeline2).sort({ fecha: 1 });

            const carteleria = await Orden.aggregate(pipeline3).sort({ fecha: 1 });

            /*
            if (categorias.length > 0) {
                res.status(200).json({ imprenta, estampado, carteleria });
            }
            else {
                res.status(200).json(null);
            };
            */
            res.status(200).json({ imprenta, estampado, carteleria });
        } catch (error) {
            console.log(error);
        }

    }
}