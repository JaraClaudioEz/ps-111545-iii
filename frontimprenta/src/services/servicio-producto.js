import http from "../http-commons";

class ProductoDataService {
    getListadoProductos(pag = 0) {
        return http.get(`/productos?pag=${pag}`);
    }

    getProducto(id) {
        return http.get(`/productos/id/${id}`);
    }

    find(query, by = "nombre", pag = 0) { 
        return http.get(`/productos?${by}=${query}&pag=${pag}`);
    }

    addProducto(data) {
        return http.post("/productos", data);
        //console.log(data);
    }

    updateProducto(data) {
        return http.put("/productos", data);
    }

    deleteProducto(id) { 
        return http.delete(`/productos?id=${id}`);
    }

    getCategorias(id) {
        return http.get(`/categorias`);
    }
}

export default new ProductoDataService();