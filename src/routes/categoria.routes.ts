import { Router } from "express";
import { CategoriaController } from "../controllers/categoria.controller.ts";

const categoriaRouter = Router();

categoriaRouter.get('/allcategories', CategoriaController.listarCategorias);
categoriaRouter.get('/categoriebyid/:id', CategoriaController.ObtenerCategoria);
categoriaRouter.post('/newcategorie', CategoriaController.crearCategoria);
categoriaRouter.put('/updatecategorie/:id', CategoriaController.ActualizarCategoria);
categoriaRouter.delete('/deletecategoria/:id', CategoriaController.EliminarCategoria);

export default categoriaRouter;