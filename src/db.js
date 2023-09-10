import mongoose from "mongoose";


export const conectarBaseDeDatos = async () =>
{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/softwareAcademico"
        ,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log(">>>Base De Datos Conectada")
    } catch (error) {
        console.log(error)
    }
};