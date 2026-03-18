import { type Request, type Response } from "express";
import { ParticipanteServices } from "../services/participante.services.ts";

export class ParticpanteController {

    static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const participantes = await ParticipanteServices.ObtenerTodos()
            res.status(200).json(participantes)
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno al obtener los participantes'});
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { nombre, fecha_nacimiento} = req.body;
            const fechaFinal: Date = new Date(fecha_nacimiento); 
            const nuevoParticipante = ParticipanteServices.CrearParticipante(nombre, fechaFinal);
            res.status(200).json(nuevoParticipante);
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async update(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const idParam: string = req.params.id;
            const id = parseInt(idParam, 10);

            if(isNaN(id)){
                res.status(400).json({ error: 'El ID proporcionado debe ser un numero valido'});
                return;
            }

            const { nombre, fecha_nacimiento } = req.body;
            const fechaFinal: Date = new Date(fecha_nacimiento);

            const participante = {
                nombre: nombre,
                fecha_nacimiento: fechaFinal
            }

            const resultado = await ParticipanteServices.ActualizarParticipante(id, participante);
            res.status(200).json({
                message: 'Partipante actualizado con exito',
                resultado
            });
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }

    static async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const idParam: string = req.params.id;
            const id = parseInt(idParam, 10);

            if(isNaN(id)){
                res.status(400).json({ error: 'El ID proporcionado debe ser un numero valido'});
                return;
            }

            await ParticipanteServices.EliminarParticipante(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({error: error.messages})
        }
    }

    static async findOne(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const idParam: string = req.params.id;
            const id = parseInt(idParam, 10);

            if(isNaN(id)){
                res.status(400).json({ error: 'El ID proporcionado debe ser un numero valido'});
                return;
            }

            const participante = await ParticipanteServices.ObtenerPorId(id);
            res.status(200).json({participante});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }
}