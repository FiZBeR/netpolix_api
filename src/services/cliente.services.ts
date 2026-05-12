import prisma from '../config/prisma.ts';
import { Prisma } from "@prisma/client";
import bcrypt from 'bcrypt';

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
        return await prisma.usuario.create({
            data
        });
    }

    static async actualizar(cedula: string, nombre: string){
        return await prisma.usuario.update({
            where: {
                cedula: cedula 
            },
            data: {
                nombre: nombre // Único campo permitido
            }
        });
    }

    static async eliminar(cedula: string){
        return await prisma.usuario.delete({
            where: { cedula: cedula}
        });
    }

    static async changePassword(cedula: string, actual: string, nueva: string){

        const usuario = await prisma.usuario.findUnique({
            where: {cedula: cedula}
        });

        if(!usuario) return false;

        const passwordValida = await bcrypt.compare(actual, usuario.password);
        if(!passwordValida) return false;

        const salt = await bcrypt.genSalt(10);
        const nuevaHashed = await bcrypt.hash(nueva, salt);

        return await prisma.usuario.update({
            where: { cedula },
            data: { password: nuevaHashed }
        });

    }
}