import objUsuario from "../modelos/UsuarioModelo.model.js";
import objRoles from "../modelos/RolModelo.model.js";

import jwt from "jsonwebtoken";
import bcrypt from  "bcryptjs"
import { crearTokenDeAcceso } from "../configuraciones/jwt.js";
import { TOKEN_SECRET } from "../configuracion.js";


export const registrarse = async ( req , res )=>{

    const {nombre , email , password , roles} =  req.body
    try 
    {
        const buscarUsuarioExistente = await  objUsuario.findOne({email});
        if(buscarUsuarioExistente) return res.status(400).json(["Usuario Existente"]);
        
        const passwordHash = await bcrypt.hash(password,10);

        const crearUsuario = new objUsuario({
            nombre , 
            email , 
            password :passwordHash
        });

        if(roles.length === 0)
        {
            const rolPorDefecto =  await objRoles.findOne({nombre:"aprendiz"})
            console.log("Rol por defecto encontrado:", rolPorDefecto);
            crearUsuario.roles = [rolPorDefecto._id];

        }else
        {
            const rolesEncontrados=  await objRoles.find({nombre:{$in:roles}})
            console.log("Roles encontrados:", rolesEncontrados);
            crearUsuario.roles = rolesEncontrados.map(Rol=>Rol._id)
        }

        const nuevoUsuarioGuardado = await crearUsuario.save()

        //console.log(crearNuevoUsuario)

        const token = await crearTokenDeAcceso({id: nuevoUsuarioGuardado._id});

        res.cookie("token",token);

        console.log("token",token)

        res.status(200).json({ 
            id:      nuevoUsuarioGuardado._id,
            email:   nuevoUsuarioGuardado.email,
            usuario: nuevoUsuarioGuardado.nombre,
            roles:   nuevoUsuarioGuardado.roles,
            token : token
        });

    } catch (error) {
        res.status(500).json({mensaje:"Error en la creacion del Usuario"})
    }

}


export const login = async ( req , res )=>{

    const { email , password} =  req.body

        
    try {
        const usuarioEncontrado= await objUsuario.findOne({email}).populate('roles');
        if(!usuarioEncontrado) return res.status(400).json({mensaje:"Usuario No Encontrado"})
        

        const compararPassword = await bcrypt.compare(password , usuarioEncontrado.password);
        if(!compararPassword) return res.status(400).json({mensaje:"Contraseña Invalida"})

        //console.log(crearNuevoUsuario)    

        const token = await crearTokenDeAcceso({id: usuarioEncontrado._id});

        res.cookie("token",token);
        console.log("token",token)

        //res.json({mensaje:"Usuario Creado Satisfactoriamente"})

        res.status(200).json({ 
            id:      usuarioEncontrado._id,
            email:   usuarioEncontrado.email,
            usuario: usuarioEncontrado.usuario,
            roles :  usuarioEncontrado.roles,
            token : token
        });

    } catch (error) {
        res.status(500).json({mensaje: error})
    }

}

export const cerrarSession = (req , res ) => 
{
    res.cookie('token',"",{expires : new Date(0) });
    return res.sendStatus(200)
}

export const verificarCookie = (req , res ) =>
{
    const { token } = req.cookies;  

    if(!token) return res.status(401).json({mensaje:"no existe la cookie"})
    
    jwt.verify(token,TOKEN_SECRET , async ( err , usuario )=>{
        if(err) return res.status(404).json({mensaje:"Error en validacion clave inexistente"})

        const usuarioEncontrado = await objUsuario.findById(usuario.id)
        if(!usuarioEncontrado) res.status(401).json({mensaje:"NO ESTA AUTORIZADO"});
        
        return res.json({
            id: usuarioEncontrado._id,
            username: usuarioEncontrado.nombre,
            email:usuarioEncontrado.email
        });
    });
}