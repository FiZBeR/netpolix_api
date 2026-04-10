import prisma from "../config/prisma.ts";

export class ColeccionServices {

    static async ObtenerTodos() {
        return await prisma.coleccion.findMany();
    }

    static async ObtenerUno(isan: string) {
        return await prisma.coleccion.findUnique({
            where: { isan: isan }
        });
    }

    static async crear(data: { isan: string, titulo: string, volumen: number}) {
        return await prisma.coleccion.create({
            data: {
                isan: data.isan,
                titulo: data.titulo.trim(),
                volumen: data.volumen
            }
        });
    }

    static async actualizar( isan: string, data: { titulo: string, volumen: number}) {

        await this.ObtenerUno(isan);

        return await prisma.coleccion.update({
            where: { isan: isan },
            data: {
                titulo: data.titulo,
                volumen: data.volumen
            }
        });
    }

    static async eliminar(isan: string) {

        await this.ObtenerUno(isan);

        return await prisma.coleccion.delete({
            where: { isan: isan }
        });
    }
}