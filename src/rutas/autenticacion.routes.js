import { Router } from "express";
import  * as AutenticacionController from "../controladores/autenticacionController.controller.js";
const ruta = Router();

ruta.post('/registrarse' , AutenticacionController.registrarse );
ruta.post('/login'       , AutenticacionController.login );
ruta.post('/cerrar', AutenticacionController.cerrarSession );
ruta.get('/verificarCookie',AutenticacionController.verificarCookie);

export default ruta;
