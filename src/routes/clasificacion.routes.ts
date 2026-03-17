import { Router } from "express";
import { ClasificacionController } from "../controllers/clasificacion.controller.ts";

const clasificacionRouter = Router();

clasificacionRouter.get('/allclasifications', ClasificacionController.listarClasificacion);
clasificacionRouter.get('/clasificatiobyid/:id', ClasificacionController.obtenerPorId);
clasificacionRouter.post('/newclasification', ClasificacionController.crearClasificacion);
clasificacionRouter.put('/updateclasification/:id', ClasificacionController.actualizarClasificacion);
clasificacionRouter.delete('/deleteclasification/:id', ClasificacionController.eliminarClasificacion);

export default clasificacionRouter;