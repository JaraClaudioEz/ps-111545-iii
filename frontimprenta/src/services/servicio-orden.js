import http from "../http-commons";

class OrdenDataService {
    getListadoOrdenes(pag = 0) {
        return http.get(`/ordenes?pag=${pag}`);
    }

    getOrdenesUsuario(idUsuario) {
        return http.get(`/ordenes/${idUsuario}`);
    }

    checkout(idUsuario) {
        return http.post(`/ordenes/${idUsuario}`);
    }

    getEstados() {
        return http.get(`/ordenes/estados`);
    }

}

export default new OrdenDataService();