import prisma from "../config/prisma.ts";

export class ClasificacionServices {

    static async ObtenerTodas() {
        return await prisma.clasificacion.findMany({
            orderBy: { tipo: 'asc' }
        }); 
    }

    static async CrearClasificacion(tipo: string, descripcion: string) {

        //Validar tipo en el enum
        const idFinal = tipo?.toUpperCase()
        const idsValidos = ['G', 'PG', 'PG_13', 'R', 'NC_127'];

        if(!idsValidos.includes(idFinal)){
            throw new Error('El tipo no es valido');
        }

        //Validar la descricion
        if(!descripcion){
            throw new Error('La descripcion es obligatoria');
        }

        return await prisma.clasificacion.create({
            data: { tipo: idFinal.trim(), descripcion: descripcion}
        });

    }

    static async ObtenerPorId(tipo: string) {

        const clasificacion = await prisma.clasificacion.findUnique({
            where: {tipo: tipo}
        });

        if(!clasificacion){
            throw new Error('No se encontro la clasificacion')
        }

        return clasificacion
    }

    static async Actualizarclasificacion(tipo: string, descripcion: string) {

        await this.ObtenerPorId(tipo);

        return await prisma.clasificacion.update({
            where: {tipo: tipo},
            data: {descripcion: descripcion}
        });

    }

    static async EliminarClasificacion(tipo: string) {

        await this.ObtenerPorId(tipo);

        return await prisma.categoria.delete({
            where: {tipo: tipo}
        });
    }
}