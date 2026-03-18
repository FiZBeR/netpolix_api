import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller.ts";

const categoriaRouter = Router();

categoriaRouter.get('/', CategoriaController.findAll);
categoriaRouter.get('/:id', CategoriaController.findOne);
categoriaRouter.post('/', CategoriaController.create);
categoriaRouter.put('/:id', CategoriaController.update);
categoriaRouter.delete('/:id', CategoriaController.delete);

export default categoriaRouter;