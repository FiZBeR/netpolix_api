import prisma from "../config/prisma.ts"

export class CategoriaServices {

    static async ObtenerTodas() {
        return await prisma.categoria.findMany({
            orderBy: { nombre: 'asc' }
        })
    }

    static async CrearCategotia(nombre: string) {

        if(!nombre || nombre.trim() === ' '){
            throw new Error('El nombre de la categoria es obligatorio')
        }
        
        return await prisma.categoria.create({
            data: {nombre: nombre.trim()}
        });

    }

    static async ObtenerPorId(id: number) {

        const categoria = await prisma.categoria.findUnique({
            where: {id_categoria: id}
        });

        if(!categoria){
            throw new Error('No se encontro la categoria')
        }

        return categoria
    }

    static async ActualizarParticipante(id: number, data: {nombre: string}) {

        await this.ObtenerPorId(id);

        return await prisma.categoria.update({
            where: {id_categoria: id},
            data: {nombre: data.nombre.trim()}
        });

    }

    static async EliminarCategoria(id: number) {

        await this.ObtenerPorId(id);

        return await prisma.categoria.delete({
            where: {id_categoria: id}
        });
    }
}