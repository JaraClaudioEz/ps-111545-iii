import http from "../http-commons";

class ProductoDataService {
    getListadoProductos(page = 0) {
        return http.get(`?page=${page}`);
    }

    getProducto(id) {
        return http.get(`/id/${id}`);
    }

    find(query, by = "name", page = 0) { 
        return http.get(`?${by}=${query}&page=${page}`);
    }

    addProducto(data) {
        return http.post("/productos", data);
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