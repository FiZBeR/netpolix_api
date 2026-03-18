import { Router } from "express";
import { ParticpanteController } from "../controllers/participante.controller.ts";

const participanteRouter = Router();

participanteRouter.get('/', ParticpanteController.findAll);
participanteRouter.get('/:id', ParticpanteController.findOne);
participanteRouter.post('/', ParticpanteController.create);
participanteRouter.put('/:id', ParticpanteController.update);
participanteRouter.delete('/:id', ParticpanteController.delete);

export default participanteRouter;