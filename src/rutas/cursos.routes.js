import {Router} from "express";
import * as cursosController  from "../controladores/cursosController.controller.js";
const ruta = Router();

ruta.post('/crear-curso', cursosController.crearCurso)

export default ruta;
