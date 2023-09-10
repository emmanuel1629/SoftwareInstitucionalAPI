import { Schema , model } from "mongoose"

const SchemaRoles = new Schema(
{
    nombre:String
},

{
    versionKey:false
}
);

export default model('Rol',SchemaRoles)