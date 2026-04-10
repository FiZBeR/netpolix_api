import { type Request, type Response } from "express";
import { ColeccionServices } from "../services/coleccion.services.ts";

export class ColeccionController {

    static async findAll (req: Request, res: Response): Promise<void>{
        try {
            const colecciones = await ColeccionServices.ObtenerTodos();
            res.status(200).json(colecciones);
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: 'Error al obtener las colecciones'})
        }
    }

    static async findOne (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            const isan = req.params.isan.trim()
            const coleccion = await ColeccionServices.ObtenerUno(isan);
            res.status(200).json(coleccion);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async create (req: Request, res: Response): Promise<void>{

        try {

            const { isan, titulo, volumen} = req.body;
            const isanLimpio = isan.trim();
            const volumenNumber = parseInt(volumen);

            if(isNaN(volumenNumber)){
                res.status(400).json({ error: 'El volumen debe ser un Numero'});
                return
            }

            if(!isan || !titulo){
                res.status(400).json({ error: 'Todos los campos son obligatoios'});
                return
            }

            if (isanLimpio.length !== 24) {
                res.status(400).json({ error: `El ISAN debe tener exactamente 24 caracteres. Enviaste ${isanLimpio.length}.`});
                return
            }

            const coleccionFinal = {
                isan: isanLimpio,
                titulo: titulo,
                volumen: volumenNumber
            }

            const coleccionNueva = await ColeccionServices.crear(coleccionFinal);
            res.status(201).json(coleccionNueva);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }    
    }

    static async update (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            const isan = req.params.isan.trim();
            const { titulo, volumen} = req.body;
            const volumenNumber = parseInt(volumen);

            if(isNaN(volumenNumber)){
                res.status(400).json({ error: 'El volumen debe ser un Numero'});
                return
            }

            if(!isan || !titulo){
                res.status(400).json({ error: 'Todos los campos son obligatoios'});
                return
            }

            if (isan.length !== 24) {
                res.status(400).json({ error: `El ISAN debe tener exactamente 24 caracteres. Enviaste ${isan.length}.`});
                return
            }

            const coleccionFinal = {
                titulo: titulo,
                volumen: volumenNumber
            }

            const coleccionNueva = await ColeccionServices.actualizar(isan, coleccionFinal);
            res.status(200).json(coleccionNueva);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }

    static async delete (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            const isan = req.params.isan.trim();
            if (!isan || isan.length !== 24) {
                res.status(400).json({ error: `El ISAN es obligatorio y debe tener exactamente 24 caracteres.`});
                return
            }

            await ColeccionServices.eliminar(isan);
            res.status(200).json({ message: 'Eliminado correctamente'});
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}