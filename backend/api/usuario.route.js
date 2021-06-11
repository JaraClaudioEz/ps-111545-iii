import express from "express";

import UsuariosCtrl from "./usuarios.controller.js";
import autorizacion from "../middleware/autorizacion.js"

const router = express.Router();

router.route("/")
    .get(UsuariosCtrl.apiGetUsuario)
    .put(UsuariosCtrl.apiUpdateUsuario)
    .delete(UsuariosCtrl.apiDeleteUsuario)

router.route("/email/:email").get(UsuariosCtrl.apiGetUsuario)
router.route("/signin").post(UsuariosCtrl.apiSigninUsuario);
router.route("/signup").post(UsuariosCtrl.apiSignupUsuario);
router.route("/google").post(UsuariosCtrl.apiSaveUsuarioGoogle);

export default router;