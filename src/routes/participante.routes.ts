import { Router } from "express";
import { ParticpanteController } from "../controllers/participante.controller.ts";

const participanteRouter = Router();

participanteRouter.get('/allparticipants', ParticpanteController.ListarParticipantes);
participanteRouter.get('/participantsbyid/:id', ParticpanteController.ObtenerParticipante);
participanteRouter.post('/newparticipants', ParticpanteController.CrearParticipante);
participanteRouter.put('/updateparticipant/:id', ParticpanteController.ActualizarParticipante);
participanteRouter.delete('/deleteparticipant/:id', ParticpanteController.EliminarParticipante);

export default participanteRouter;