import { AnyNullClass } from "@prisma/client/runtime/client";
import prisma from "../config/prisma.ts"
import bcrypt from 'bcrypt'

export class LoginServices {

    static async login(cedula: string, passwordEnviada: string) {

        const usuario = await prisma.usuario.findUnique({
            where: {cedula: cedula}
        });

        if(!usuario) return null;

        const passwordValidated = await bcrypt.compare(passwordEnviada, usuario.password);

        if(!passwordValidated) return null;

        const { password, ...UsuarioSinPassword} = usuario; 

        return UsuarioSinPassword;
    }
}