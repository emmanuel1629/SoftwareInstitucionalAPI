import objCarrera from '../modelos/CarreraModelo.model.js';
import objCurso from '../modelos/CursosModelo.model.js';


export const crearCarrera = async (req , res) => 
{   const { nombreCarrera, curso } = req.body;

    const crearCarrera = objCarrera({
        nombreCarrera:nombreCarrera
    })

    console.log(curso);
    if(curso)
    {
        const cursoEncontrado = await objCurso.find({nombreCurso:{$in:curso}});
        console.log("cursoEncontrado:", cursoEncontrado);
        crearCarrera.cursos = cursoEncontrado;
    }
    else
    {
        console.log("cursoEncontrado:", "no se encontro curso ");

    }

    const guardarCarera = crearCarrera.save();

    res.status(200).json(guardarCarera);
    console.log(req.body)
}

export const mostarCarreras = async (req,res)=>
{
    const obtenerTodasLasCarreras = await objCarrera.find().populate('cursos');
    res.json({carreras:obtenerTodasLasCarreras});
}