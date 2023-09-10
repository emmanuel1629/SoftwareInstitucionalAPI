import  {Schema , model}  from "mongoose";

const CursoSchema = new Schema({
    nombreCurso:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }
},
{
    timestamps:true,
    versionKey:false
}
);

export default model('Curso',CursoSchema);