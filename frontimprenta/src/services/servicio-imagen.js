import https from "../https-commons";

class ImganeDataService {

    getImagenesIG() {
        return https.get("/imagenes");
    };

    addImagen(formData) {
        return https.post("/imagenes", formData);
    };

    updateImagen(formData, id) {
        return https.put(`/imagenes/${id}`, formData);
    };

    deleteImagen(id) {
        return https.delete(`/imagenes?id=${id}`);
    };
};

export default new ImganeDataService();