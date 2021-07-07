import http from "../http-commons";

class ReporteDataService {

    getTotalVentasPeriodo(formato) {
        return http.get(`/reportes?formatoFecha=${formato}`);
    };

    getCantidadesPorProducto(mayor) {
        return http.get(`/reportes/porProducto?return=${mayor}`);
    };

};

export default new ReporteDataService();