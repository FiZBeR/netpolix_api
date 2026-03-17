import { type Request, type Response } from "express";
import { ClasificacionServices } from "../services/clasificacion.services.ts";


export class ClasificacionController {

    static async listarClasificacion( req: Request, res: Response): Promise<void> {
        try {
            const clasificacion = await ClasificacionServices.ObtenerTodas();
            res.status(200).json(clasificacion);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error interno al obtener las calsificaciones'})
        }
    }

    static async crearClasificacion(req: Request, res: Response): Promise<void> {
        try {
            const { id, descripcion} = req.body;
            const nuevaClasificacion = await ClasificacionServices.CrearClasificacion(id, descripcion);
            res.status(200).json(nuevaClasificacion);
        } catch (error: any) {
            res.status(400).json({ error: error.message});
        }
    }

    static async actualizarClasificacion( req: Request<{ id: string }>, res: Response): Promise<void> {
        try {
            const tipo: string = req.params.id;
            const idsValidos = ['G', 'PG', 'PG_13', 'R', 'NC_127'];
            
            if(!idsValidos.includes(tipo)){
                res.status(400).json({ error: 'El ID proporcionado no es valido'});
                return
            }

            const { descripcion } = req.body;
            const nuevaClasificacion = ClasificacionServices.Actualizarclasificacion(tipo, descripcion);
            res.status(200).json(nuevaClasificacion);
        } catch (error: any) {
            res.status(400).json({ error: error.message})
        }
    }
    
    static async eliminarClasificacion(req: Request<{ id: string }>, res: Response): Promise<void> {
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

    static async obtenerPorId(req: Request<{ id: string }>, res: Response): Promise<void> {
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