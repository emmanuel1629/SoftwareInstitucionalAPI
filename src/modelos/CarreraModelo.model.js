import  {Schema , model}  from "mongoose";

const CarreraSchema = new Schema({
    nombreCarrera:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    cursos:[{
        ref : "Curso",
        type: Schema.Types.ObjectId
    }]
},
{
    timestamps:true,
    versionKey:false
}
);

export default model('Carrera',CarreraSchema);