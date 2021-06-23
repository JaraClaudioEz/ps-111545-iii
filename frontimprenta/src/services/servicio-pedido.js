import http from "../http-commons";

class PedidoDataService {
    getProductosPedido(idUsuario) {
        return http.get(`/pedidos/${idUsuario}`);
    }

    addProductoPedido(idUsuario, idProducto, cantidad) {
        return http.post(`/pedidos/${idUsuario}`, {idProducto, cantidad});
    }

    deleteProductoPedido(idUsuario, idProducto) { 
        return http.delete(`/pedidos/${idUsuario}/${idProducto}`);
    }
}

export default new PedidoDataService();