import prisma from '../config/prisma.ts';
import { Prisma } from "@prisma/client";

export class ClienteServices {

    static async listarTodos(){
        return await prisma.usuario.findMany();
    }

    static async listarUno(cedula: string){
        return await prisma.usuario.findUnique({
            where: { cedula: cedula}
        });
    }

    static async crear(data: Prisma.UsuarioUncheckedCreateInput){

    }

    static async actualizar(cedula: string, data: Prisma.UsuarioUncheckedCreateInput){

    }

    static async eliminar(cedula: string){
        return await prisma.usuario.delete({
            where: { cedula: cedula}
        });
    }
}