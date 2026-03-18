import { type Request, type Response } from "express";
import { CategoriaServices } from "../services/categoria.services.ts";

export class CategoriaController {

    static async findAll( req: Request, res: Response): Promise<void> {
        try {
            const categoria = await CategoriaServices.ObtenerTodas();
            res.status(200).json(categoria);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno al obtener las categorias'})
        }
    }

    static async create( req: Request, res: Response): Promise<void> {
        try {
            const { nombre } = req.body
            const nuevaCategoria = CategoriaServices.CrearCategotia(nombre);
            res.status(200).json(nuevaCategoria);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
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

            const datosNuevos = req.body;

            const resultado = await CategoriaServices.ActualizarParticipante(id, datosNuevos);
            res.status(200).json(resultado);;
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

            await CategoriaServices.EliminarCategoria(id);
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
                return
            }

            const categoria = await CategoriaServices.ObtenerPorId(id);
            res.status(200).json({categoria});
        } catch (error: any) {
            res.status(400).json({error: error.message});
        }
    }
}