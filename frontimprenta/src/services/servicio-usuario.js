import http from "../http-commons";

class UsuarioDataService {
    getListadoUsuarios(pag = 0) {
        return http.get(`/usuarios?pag=${pag}`);
    }

    getUsuario(id) {
        return http.get(`/usuarios/id/${id}`);
    }

    find(query, by = "nombre", pag = 0) { 
        return http.get(`/usuarios?${by}=${query}&pag=${pag}`);
    }

    signInUsuario(formData) {
        return http.post("/usuarios/signin", formData);
    }

    signUpUsuario(formData) {
        return http.post("/usuarios/signup", formData);
    }

    updateUsuario(data) {
        return http.put("/usuarios", data);
    }

    deleteUsuario(id) { 
        return http.delete(`/usuarios?id=${id}`);
    }
}

export default new UsuarioDataService();