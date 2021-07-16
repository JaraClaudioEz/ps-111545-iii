import express from "express";

import UsuariosCtrl from "./usuarios.controller.js";
import autorizacion from "../middleware/autorizacion.js"

const router = express.Router();

router.route("/")
    .get(autorizacion, UsuariosCtrl.apiGetUsuarios)
    .put(autorizacion, UsuariosCtrl.apiUpdateUsuario)
    .delete(autorizacion, UsuariosCtrl.apiDeleteUsuario)

router.route("/id/:id").get(autorizacion, UsuariosCtrl.apiGetUsuarioById)
router.route("/email/:email").get(autorizacion, UsuariosCtrl.apiGetUsuarioPorEmail)
router.route("/signin").post(UsuariosCtrl.apiSigninUsuario);
router.route("/signup").post(UsuariosCtrl.apiSignupUsuario);
router.route("/google").post(UsuariosCtrl.apiSaveUsuarioGoogle);
router.route("/verificar/:stringVerif").get(UsuariosCtrl.apiVerificarUsuario);
router.route("/contacto").post(UsuariosCtrl.apiEnviarConsulta);

export default router;