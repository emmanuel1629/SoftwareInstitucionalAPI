import express from 'express';
import morgan from 'morgan';
import autenticacionRutas from "./rutas/autenticacion.routes.js";
import cursosRutas from "./rutas/cursos.routes.js";
import carrerasRutas from "./rutas/carreras.routes.js";


import { crearRoles } from './configuraciones/IniciarRoles.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();
crearRoles();

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));


app.use('/API',autenticacionRutas)
app.use('/API',cursosRutas)
app.use('/API',carrerasRutas)

export default app;