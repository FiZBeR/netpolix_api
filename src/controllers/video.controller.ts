import { VideoServices } from "../services/video.services.ts";
import { type Request, type Response } from "express";
import { Prisma } from '@prisma/client';

export class VideoController {

    static async findAll (req: Request, res: Response): Promise<void>{
        try {
            const videos = await VideoServices.obtenerTodos()
            res.status(200).json(videos);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno al obtener todos los videos'})
        }
    }

    static async findOne (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            const idParam = req.params.isan;

            const video = await VideoServices.obtenerUno(idParam);
            res.status(200).json(video);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }

    static async create (req: Request, res: Response): Promise<void>{
        try {

            const { isan, titulo_original, anio_produccion, duracion_min, clasificacion_id, serie_id} = req.body;

            if(!isan || isan.length < 24 || isan.length > 24 || titulo_original?.length == 0){
                res.status(400).json({error: 'El isan debe tener exactamente 24 caracteres y el titulo es obligatorio'});
                return
            }

            if(isNaN(anio_produccion) || isNaN(duracion_min)){
                res.status(400).json({error: 'El año de produccion o la duracion son obligatorias y deben ser numeros enteros'});
                return
            }

            const newVideo = {
                isan,
                titulo_original, 
                anio_produccion, 
                duracion_min, 
                clasificacion_id, 
                serie_id
            }

            const resultado = await VideoServices.crear(newVideo);
            res.status(201).json(resultado);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }

    static async update (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            const idParam = req.params.isan;
            const { titulo_original, anio_produccion, duracion_min, clasificacion_id, serie_id} = req.body;

             if(titulo_original?.length == 0){
                res.status(400).json({error: 'El isan debe tener exactamente 24 caracteres y el titulo es obligatorio'});
                return
            }

            if(isNaN(anio_produccion) || isNaN(duracion_min)){
                res.status(400).json({error: 'El año de produccion o la duracion son obligatorias y deben ser numeros enteros'});
                return
            }

            if(isNaN(clasificacion_id) || !clasificacion_id){
                res.status(400).json({error: 'El ID de la clasificacion no es valido o la clasificacion es obligatoria'});
                return;
            }

            const updateVideo = {
                titulo_original, 
                anio_produccion, 
                duracion_min, 
                clasificacion_id, 
                serie_id
            }

            const resultado = await VideoServices.actualizar(idParam, updateVideo);
            res.status(200).json(resultado);

        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async delete (req: Request<{ isan: string }>, res: Response): Promise<void>{
        try {
            const idParam = req.params.isan;

            await VideoServices.eliminar(idParam);
            res.status(200).json({ message: 'Video Eliminado'});
        } catch (error: any) {
            res.status(400).json({error: error.message})
        }
    }
}