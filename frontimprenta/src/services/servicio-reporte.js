import http from "../http-commons";

class ReporteDataService {

    getTotalVentasPeriodo(formato) {
        return http.get(`/reportes?formatoFecha=${formato}`);
    };

};

export default new ReporteDataService();