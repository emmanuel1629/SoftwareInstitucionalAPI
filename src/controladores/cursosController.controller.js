import objCursos from '../modelos/CursosModelo.model.js';

export const crearCurso = async (req,res)=>{
    const cursoCreador = objCursos({
        nombreCurso:req.body.nombreCurso
    });

   const cursoGuardado = await cursoCreador.save();

   res.status(200).json(cursoGuardado);
}