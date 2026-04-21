import { ClienteServices } from "../services/cliente.services.ts";
import { type Request, type Response } from "express";
import bcrypt from 'bcrypt';


interface CreateUserDTO {
    cedula: string;
    nombre: string;
    password: string;
    rol: RolUsuario; // El Enum que definiste en Prisma
}


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
            const { cedula, nombre, password, rol, created_At} = req.body;

            const salt = await bcrypt.genSalt(10);
            const passwordHasheada = await bcrypt.hash(password, salt);

            if(!cedula || !nombre || !password || !rol || !created_At ){
                res.status(400).json({ error: 'Todos los campos son obligatorios' });
                return;
            }

            if (cedula.length < 5) {
                res.status(400).json({ error: 'La cédula no parece válida' });
                return;
            }

            if (password.length < 7) {
                res.status(400).json({ error: 'La constraseña debe tener más de 8 caracteres' });
                return;
            }

            const newCliente = {

            }

            const respuesta = await ClienteServices.crear(newCliente);
            res.status(201).json(newCliente);
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