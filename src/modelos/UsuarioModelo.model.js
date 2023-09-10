import  {Schema , model}  from "mongoose";

const UsuarioSchema = new Schema({
    nombre:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    roles:{
        ref : "Rol",
        type: Schema.Types.ObjectId
    }
},
{
    timestamps:true,
    versionKey:false
}
);

export default model('Usuario',UsuarioSchema);