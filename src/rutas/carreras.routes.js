import { Router } from "express";
import * as carreraController from "../controladores/carreraController.controller.js";
const ruta = Router();

ruta.post('/crear-carrera' ,carreraController.crearCarrera );
ruta.get('/obtener-carreras' ,carreraController.mostarCarreras );


export default ruta;