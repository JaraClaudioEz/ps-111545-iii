import http from "../https-commons";

class ReporteDataService {

    getTotalVentas(formato) {
        return http.get(`/reportes?formatoFecha=${formato}`);
    };

    getTotalVentasPeriodo(desde, hasta) {
        return http.get(`/reportes?desde=${desde}&hasta=${hasta}`);
    };

    getCantidadesPorProducto(mayor) {
        return http.get(`/reportes/porProducto?return=${mayor}`);
    };

    getVentasPorCategorias() {
        return http.get(`/reportes/porCategoria`);
    };

};

export default new ReporteDataService();