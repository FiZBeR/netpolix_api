import prisma from "../config/prisma.ts";
import { Prisma } from "@prisma/client";

export class VideoServices {

    static async obtenerTodos () {
        return await prisma.video.findMany();
    }

    static async obtenerUno (isan: string) {
        return await prisma.video.findUnique({
            where: {isan: isan}
        });
    }

    static async crear (data: Prisma.VideoUncheckedCreateInput) {
        return await prisma.video.create({
            data: data
        });
    }

    static async actualizar (isan: string, data: Prisma.VideoUpdateInput) {

        await this.obtenerUno(isan);

        return await prisma.video.update({
            where: { isan: isan },
            data: data
        });
        
    }

    static async eliminar (isan: string) {
        return await prisma.video.delete({
            where: { isan: isan}
        });
    }
}