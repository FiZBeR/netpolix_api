import { Router } from "express";
import { IdiomaController } from "../controllers/idioma.controller.ts";

const idiomaRouter = Router();

idiomaRouter.get('/', IdiomaController.findAll);
idiomaRouter.get('/:id', IdiomaController.findOne);
idiomaRouter.post('/', IdiomaController.create);
idiomaRouter.put('/:id', IdiomaController.update);
idiomaRouter.delete('/:id', IdiomaController.delete);

export default idiomaRouter;