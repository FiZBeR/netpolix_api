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
            const body = req.body as CreateUsuarioDTO;

            const salt = await bcrypt.genSalt(10);
            const passwordHasheada = await bcrypt.hash(body.password, salt);

            if(!body.cedula || !body.nombre || !body.password || !body.rol ){
                res.status(400).json({ error: 'Todos los campos son obligatorios' });
                return;
            }

            if (body.cedula.length < 5 || body.password.length < 7) {
                res.status(400).json({ error: 'La cédula no parece válida o La constraseña debe tener más de 8 caracteres' });
                return;
            }

            body.password = passwordHasheada;

            const respuesta = await ClienteServices.crear(body);
            res.status(201).json(respuesta);
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async update(req: Request<{ cedula: string }>, res: Response): Promise<void>{
        try {
            
        } catch (error) {
            
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
}