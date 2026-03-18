import { type Request, type Response } from "express";
import { SerieServices } from "../services/serie.services.ts";

export class SerieController {

    static async findAll(req: Request, res: Response): Promise<void> {
        try {
            const series = await SerieServices.listarTodo()
            res.status(200).json(series);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno al obtener los idiomas'})
        }
    }

    static async findOne(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const idParam = req.params.id;
            const id = parseInt(idParam, 10);

            const serie = await SerieServices.listarUno(id);
            res.status(200).json(serie);
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {

            const { titulo, sinopsis} = req.body;

            if(!titulo || !sinopsis){
                res.status(400).json({error: 'El titulo y la sinopsis son obligatorias'});
                return
            }

            const serieNueva = {
                titulo: titulo.trim(),
                sinopsis: sinopsis
            }

            const resultado = await SerieServices.crear(serieNueva);
            res.status(200).json(resultado);

        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async update(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const idParam = req.params.id;
            const id = parseInt(idParam, 10);

            if(isNaN(id)){
                res.status(400).json({ error:'El ID no es valido'});
                return
            }

            const { titulo, sinopsis} = req.body;

            if(!titulo || !sinopsis){
                res.status(400).json({error: 'El titulo y la sinopsis son obligatorias'});
                return
            }

            const serieActualizada = {
                titulo: titulo.trim(),
                sinopsis: sinopsis
            }

            const resultado = await SerieServices.actualizar(id, serieActualizada);
            res.status(200).json(resultado);
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async delete(req: Request<{id: string}>, res: Response): Promise<void> {
        try {
            const idParam = req.params.id;
            const id = parseInt(idParam, 10);

            if(isNaN(id)){
                res.status(400).json({ error: 'El ID no es valido'});
            }

            await SerieServices.eliminar(id);
            res.status(200).json({ message: 'Serie Eliminada'});
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }
}