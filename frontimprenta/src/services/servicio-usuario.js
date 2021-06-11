import http from "../http-commons";

class UsuarioDataService {
    constructor(){
        http.interceptors.request.use((req) => {
            if(localStorage.getItem('perfil')){
                req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('perfil')).token}`;
            }
            return req;
        });
    }

    getListadoUsuarios(pag = 0) {
        return http.get(`/usuarios?pag=${pag}`);
    }

    getUsuario(email) {
        return http.get(`/usuarios/email/${email}`);
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

    saveUsuarioGoogle(formData) {
        return http.post("/usuarios/google", formData);
    }

    updateUsuario(data) {
        return http.put("/usuarios", data);
    }

    deleteUsuario(id) { 
        return http.delete(`/usuarios?id=${id}`);
    }
}

export default new UsuarioDataService();