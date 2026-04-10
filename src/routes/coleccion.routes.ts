import { Router } from "express";
import { ColeccionController } from "../controllers/coleccion.controller.ts";

const coleccionRouter = Router();

coleccionRouter.get('/', ColeccionController.findAll);
coleccionRouter.get('/:isan', ColeccionController.findOne);
coleccionRouter.post('/', ColeccionController.create);
coleccionRouter.put('/:isan', ColeccionController.update);
coleccionRouter.delete('/:isan', ColeccionController.delete);

export default coleccionRouter;