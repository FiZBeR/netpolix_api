import prisma from "../config/prisma.ts";

export class ParticipanteServices {

    static async ObtenerTodos() {
        return await prisma.participante.findMany({
            orderBy: { nombre: 'asc' }
        })
    }

    static async CrearParticipante(nombre: string, fecha_nacimiento: Date) {

        if(!nombre || nombre.trim() === ' '){
            throw new Error('El nombre del idioma es obligatorio')
        }

        return await prisma.participante.create({
            data: {
                nombre: nombre.trim(), 
                fecha_nacimiento: fecha_nacimiento
            }
        })
    }

    static async ObtenerPorId(id: number) {

        const participante = await prisma.participante.findUnique({
            where: {id_participante: id}
        });

        if(!participante){
            throw new Error('No se encontro al participante')
        }

        return participante
    }

    static async ActualizarParticipante(id: number, datosActualizados: any) {

        await this.ObtenerPorId(id);

        return await prisma.participante.update({
            where: {id_participante: id},
            data: {datosActualizados}
        });

    }

    static async EliminarParticipante(id: number) {

        await this.ObtenerPorId(id);

        return await prisma.participante.delete({
            where: {id_participante: id}
        });
    }
}