import express from "express";
import UsuariosCtrl from "./usuarios.controller.js";

const router = express.Router();

router.route("/")
    .get(UsuariosCtrl.apiGetUsuario)
    .put(UsuariosCtrl.apiUpdateUsuario)
    .delete(UsuariosCtrl.apiDeleteUsuario)

router.route("/signin").post(UsuariosCtrl.apiSigninUsuario);
router.route("/signup").post(UsuariosCtrl.apiSignupUsuario);

export default router;