import http from "../http-commons";

class OrdenDataService {
    getListadoOrdenes(pag = 0) {
        return http.get(`/ordenes?pag=${pag}`);
    }

    getOrdenesUsuario(idUsuario) {
        return http.get(`/ordenes/${idUsuario}`);
    }

    getOrden(idOrden) {
        return http.get(`/ordenes/id/${idOrden}`);
    }

    checkout(idUsuario) {
        return http.post(`/ordenes/${idUsuario}`);
    }

    updateOrden(data) {
        return http.put("/ordenes", data);
    }

    getEstados() {
        return http.get(`/ordenes/estados`);
    }

}

export default new OrdenDataService();