import { Router } from "express";
import { IdiomaController } from "../controllers/idioma.controller.ts";

const idiomaRouter = Router();

idiomaRouter.get('/alllenguages', IdiomaController.listarIdiomas);
idiomaRouter.get('/lenguagebyid/:id', IdiomaController.obtenerPorId);
idiomaRouter.post('newlenguage', IdiomaController.crearIdioma);
idiomaRouter.put('/updatelenguage/:id', IdiomaController.actualizarIdioma);
idiomaRouter.delete('/deletelenguage/:id', IdiomaController.eliminarIdioma);

export default idiomaRouter;