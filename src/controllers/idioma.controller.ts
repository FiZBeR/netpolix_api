import { type Request, type Response } from "express";
import { IdiomaServices } from "../services/idioma.services.ts";

export class IdiomaController {

    static async findAll( req: Request, res: Response): Promise<void> {
        try {
            const idioma = await IdiomaServices.ObtenerTodos();
            res.status(200).json(idioma);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno al obtener los idiomas'})
        }
    }


    static async create( req: Request, res: Response): Promise<void> {
        try {
            const { nombre } = req.body;
            const nuevoIdioma = IdiomaServices.CrearIdioma(nombre);
            res.status(200).json(nuevoIdioma);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }

    static async update( req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const idParam: string = req.params.id;
            const id = parseInt(idParam, 10);

            if(isNaN(id)){
                res.status(400).json({error: 'El ID proporcionado no es valido'});
                return
            }

            const datosNuevos = req.body;
            const resultado = IdiomaServices.ActualizarIdioma(id, datosNuevos);
            res.status(200).json(resultado);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }
    
    static async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            
            const idParam: string = req.params.id;
            const id = parseInt(idParam, 10);

            if(isNaN(id)){
                res.status(400).json({error: 'El ID proporcionado no es valido'});
                return
            }

            await IdiomaServices.EliminarIdioma(id);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async findOne(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const idParam: string = req.params.id;
            const id = parseInt(idParam, 10);

            if(isNaN(id)){
                res.status(400).json({ error: 'El ID proporcionado no es valido'});
            }

            const idioma = await IdiomaServices.ObtenerPorId(id);
            res.status(200).json({idioma});
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }
}