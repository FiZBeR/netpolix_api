import prisma from "../config/prisma.ts";

export class SerieServices {

    static async listarTodo() {
        return await prisma.serie.findMany();
    }

    static async listarUno(id: number) {
        const serie = await prisma.serie.findUnique({
            where: {id_serie: id}
        });

        if(!serie){
            throw new Error('No se encontro la serie')
        }

        return serie;
    }

    static async crear(data: { titulo: string, sinopsis: string }) {
        
        return await prisma.serie.create({
            data: {
                titulo: data.titulo.trim(),
                sinopsis: data.sinopsis
            }
        })
    }

    static async actualizar(id: number, data: {titulo: string, sinopsis: string}) {
        
        return await prisma.serie.update({
            where: {id_serie: id},
            data: {
                titulo: data.titulo.trim(),
                sinopsis: data.sinopsis
            }
        });
    }

    static async eliminar(id: number) {
        return await prisma.serie.delete({
            where: { id_serie: id}
        })
    }
}