import { VideoController } from "../controllers/video.controller.ts";
import { Router } from "express";

const videoRouter = Router();

videoRouter.get('/', VideoController.findAll);
videoRouter.get('/:isan', VideoController.findOne);
videoRouter.post('/', VideoController.create);
videoRouter.put('/:isan', VideoController.update);
videoRouter.delete('/:isan', VideoController.delete);

export default videoRouter;