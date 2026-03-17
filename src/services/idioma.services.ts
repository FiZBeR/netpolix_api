import prisma from "../config/prisma.ts";

export class IdiomaServices {
    
    static async ObtenerTodos() {
        return await prisma.idioma.findMany({
            orderBy: { nombre: 'asc' }
        })
    }

    static async CrearIdioma(nombre: string) {

        if(!nombre || nombre.trim() === ' '){
            throw new Error('El nombre del idioma es obligatorio')
        }

        return await prisma.idioma.create({
            data: {nombre: nombre.trim()}
        });
    }

    static async ObtenerPorId(id: number) {

        const idioma = await prisma.idioma.findUnique({
            where: {id_categoria: id}
        });

        if(!idioma){
            throw new Error('No se encontro el idioma')
        }

        return idioma
    }

    static async ActualizarIdioma(id: number, nombre: string) {

        await this.ObtenerPorId(id);

        if(!nombre || nombre.trim() === ' '){
            throw new Error('El nombre del idioma es obligatorio')
        }

        return await prisma.idioma.update({
            where: {id_idioma: id},
            data: {nombre: nombre.trim()}
        });

    }

    static async EliminarIdioma(id: number) {

        await this.ObtenerPorId(id);

        return await prisma.idioma.delete({
            where: {id_idioma: id}
        });
    }
}