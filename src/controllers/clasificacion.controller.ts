import { type Request, type Response } from "express";
import { ClasificacionServices } from "../services/clasificacion.services.ts";


export class ClasificacionController {

    static async findAll( req: Request, res: Response): Promise<void> {
        try {
            const clasificacion = await ClasificacionServices.ObtenerTodas();
            res.status(200).json(clasificacion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno al obtener las calsificaciones'})
        }
    }

    static async create(req: Request, res: Response): Promise<void> {
        try {
            const { tipo, descripcion} = req.body;
            const nuevaClasificacion = await ClasificacionServices.CrearClasificacion(tipo, descripcion);
            res.status(200).json(nuevaClasificacion);
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async update( req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const tipo: string = req.params.id;
            const idsValidos = ['G', 'PG', 'PG_13', 'R', 'NC_127'];
            
            if(!idsValidos.includes(tipo)){
                res.status(400).json({ error: 'El ID proporcionado no es valido'});
                return
            }

            const datosNuevos = req.body;
            const resultado = ClasificacionServices.Actualizarclasificacion(tipo, datosNuevos);
            res.status(200).json(resultado);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }
    
    static async delete(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            
            const tipo: string = req.params.id;
            const idsValidos = ['G', 'PG', 'PG_13', 'R', 'NC_127'];
            
            if(!idsValidos.includes(tipo)){
                res.status(400).json({ error: 'El ID proporcionado no es valido'});
                return
            }

            await ClasificacionServices.EliminarClasificacion(tipo)
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async findOne(req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const tipo: string = req.params.id;
            const idsValidos = ['G', 'PG', 'PG_13', 'R', 'NC_127'];
            
            if(!idsValidos.includes(tipo)){
                res.status(400).json({ error: 'El ID proporcionado no es valido'});
                return
            }

            const clasificacion = await ClasificacionServices.ObtenerPorId(tipo)
            res.status(200).json({clasificacion});
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }
}