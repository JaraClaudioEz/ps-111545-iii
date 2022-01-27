import http from "../https-commons";

class OrdenDataService {
    getListadoOrdenes(pag) {
        return http.get(`/ordenes?pag=${pag}`);
    };

    getOrdenesUsuario(idUsuario) {
        return http.get(`/ordenes/${idUsuario}`);
    };

    getOrden(idOrden) {
        return http.get(`/ordenes/id/${idOrden}`);
    };

    find(query, by = "nombre", pag) { 
        return http.get(`/ordenes?${by}=${query}&pag=${pag}`);
    }

    checkout(idUsuario) {
        return http.post(`/ordenes/${idUsuario}`);
    };

    updateOrden(data) {
        return http.put("/ordenes", data);
    };

    getEstados() {
        return http.get("/ordenes/estados");
    };

    deleteOrden(id) { 
        return http.delete(`/ordenes?id=${id}`);
    };

};

export default new OrdenDataService();