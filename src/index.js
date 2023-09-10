import app from './app.js';
import {conectarBaseDeDatos} from './db.js';

conectarBaseDeDatos();
app.listen(3000)
console.log("servidor en puerto",3000)