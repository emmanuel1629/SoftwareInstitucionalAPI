import objRoles from '../modelos/RolModelo.model.js';

export const crearRoles = async () => {

    try {
        const verificarExistenciaDeRoles = await objRoles.estimatedDocumentCount();

        if(verificarExistenciaDeRoles > 0 ) return;

        const rolesCreadosEnPrimeraInstancia = await Promise.all([
            new objRoles({nombre:'administrador'}).save(),
            new objRoles({nombre:'profesor'}).save(),
            new objRoles({nombre:'aprendiz'}).save(),
        ]);

        console.log(rolesCreadosEnPrimeraInstancia);
    } catch (error) {
        console.error(error);
    }
   

}