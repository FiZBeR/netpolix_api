import { ClienteServices } from "../services/cliente.services.ts";
import { type Request, type Response } from "express";
import bcrypt from 'bcrypt';
import type { CreateUsuarioDTO } from "../utils/interfaces/cliente.dto.ts";



export class ClienteController {

    static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const clientes = await ClienteServices.listarTodos();
            res.status(200).json(clientes);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al listar todos los clientes'});
        }
    }

    static async findOne(req: Request<{ cedula: string }>, res: Response): Promise<void>{
        try {
            const cedula = req.params.cedula;
            const cliente = await ClienteServices.listarUno(cedula);
            res.status(200).json(cliente);
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { cedula, nombre, password, rol } = req.body;

            if (!cedula || !nombre || !password || !rol) {
                res.status(400).json({ error: 'Faltan campos obligatorios' });
                return;
            }

            if (password.length < 8) {
                res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres' });
                return;
            }

            const salt = await bcrypt.genSalt(10);
            const passwordHasheada = await bcrypt.hash(password, salt);

            const CreateUsuarioDTO = {
                cedula,
                nombre,
                password: passwordHasheada,
                rol,
            };

            const respuesta = await ClienteServices.crear(CreateUsuarioDTO);
            res.status(201).json(respuesta);
        } catch (error: any) {
            if (error.code === 'P2002') {
                res.status(409).json({ error: 'Ya existe un usuario con esta cédula' });
                return;
            }
            res.status(500).json({ error: 'Error interno al crear el usuario' });
        }
    }

    static async update(req: Request<{ cedula: string }>, res: Response): Promise<void>{
        try {

            const { cedula } = req.params;
            const { nombre} = req.body;

            if (!nombre) {
                res.status(400).json({ error: 'Debes proporcionar al menos un campo válido para actualizar (nombre o rol)'});
                return;
            }

            const usuarioActualizado = await ClienteServices.actualizar(cedula, nombre);

            if (!usuarioActualizado) {
                res.status(404).json({ error: 'No se encontró un usuario con esa cédula' });
                return;
            }

            res.status(200).json(usuarioActualizado);
        } catch (error) {
            res.status(500).json({ error: 'Error interno al intentar actualizar el perfil' });
        }
    }

    static async delete(req: Request<{ cedula: string }>, res: Response): Promise<void>{
        try {
            const cedula = req.params.cedula;
            await ClienteServices.eliminar(cedula);
            res.status(200).json({ message: 'cliente eliminado'});
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }

    static async updatePassword(req: Request<{ cedula: string }>, res: Response): Promise<void>{
        try {
            const cedula = req.params.cedula;
            const { passwordActual, passwordNueva} = req.body;

            if(!passwordActual || !passwordNueva){
                res.status(400).json({ error: 'Ambas constraseña son obligatorias'});
                return;
            }

            if(passwordNueva.length < 8){
                res.status(400).json({ error: 'La nueva constraseña debe tener al menos 8 caracteres'});
                return;
            }

            const resultado = await ClienteServices.changePassword(cedula, passwordActual, passwordNueva);

            if(!resultado){
                res.status(401).json({ error: 'La constraseña actual no coincide con la registrada'});
                return;
            }

            res.status(200).json({ message: 'La contraseña a sido actualizada con exito'});

        } catch (error: any) {
            res.status(500).json({ error: 'Error interno al procesar el cambio de clave' });
        }
    }
}