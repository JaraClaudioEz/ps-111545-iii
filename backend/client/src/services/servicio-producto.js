import http from "../https-commons";

class ProductoDataService {
    getListadoProductos(pag) {
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
    }

    updateProducto(data) {
        return http.put("/productos", data);
    }

    deleteProducto(id) { 
        return http.delete(`/productos?id=${id}`);
    }

    getCategorias() {
        return http.get(`/categorias`);
    }

    addImagen(formData){
        return http.post("/imagenes", formData)
    }

    updateImagen(formData, id){
        return http.put(`/imagenes/${id}`, formData)
    }

    deleteImagen(id) { 
        return http.delete(`/imagenes?id=${id}`);
    }
}

export default new ProductoDataService();