import http from "../https-commons";

class ImganeDataService {

    getImagenesIG() {
        return http.get("/imagenes");
    };

    addImagen(formData) {
        return http.post("/imagenes", formData);
    };

    updateImagen(formData, id) {
        return http.put(`/imagenes/${id}`, formData);
    };

    deleteImagen(id) {
        return http.delete(`/imagenes?id=${id}`);
    };
};

export default new ImganeDataService();