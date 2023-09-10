import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from "../configuracion.js";

export function crearTokenDeAcceso(payload)
{
   return new Promise ((resolve , reject ) => {
        jwt.sign(
            payload,

            TOKEN_SECRET,

            {expiresIn : "1d"},

            (err,token)=>{

                if(err)reject(err);

                resolve(token);
            }
        );
   })
    
}


