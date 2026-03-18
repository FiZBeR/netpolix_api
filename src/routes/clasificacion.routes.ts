import { Router } from "express";
import { ClasificacionController } from "../controllers/clasificacion.controller.ts";

const clasificacionRouter = Router();

clasificacionRouter.get('/', ClasificacionController.findAll);
clasificacionRouter.get('/:id', ClasificacionController.findOne);
clasificacionRouter.post('/', ClasificacionController.create);
clasificacionRouter.put('/:id', ClasificacionController.update);
clasificacionRouter.delete('/:id', ClasificacionController.delete);

export default clasificacionRouter;