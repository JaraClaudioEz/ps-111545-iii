import http from "../http-commons";

class OrdenDataService {
    getOrdenes(idUsuario) {
        return http.get(`/ordenes/${idUsuario}`);
    }

    checkout(idUsuario) {
        return http.post(`/ordenes/${idUsuario}`);
    }

}

export default new OrdenDataService();