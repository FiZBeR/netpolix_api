import { Router } from "express";
import { SerieController } from "../controllers/serie.controller.ts";

const serieRouter = Router();

serieRouter.get('/', SerieController.findAll);
serieRouter.get('/:id', SerieController.findOne);
serieRouter.post('/', SerieController.create);
serieRouter.put('/:id', SerieController.update);
serieRouter.delete('/:id', SerieController.delete);

export default serieRouter;