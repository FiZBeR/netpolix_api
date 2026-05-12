import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller.ts";

const clienteRouter = Router();

clienteRouter.get('/', ClienteController.findAll);
clienteRouter.get('/:cedula', ClienteController.findOne);
clienteRouter.post('/', ClienteController.create);
clienteRouter.put('/:cedula', ClienteController.update);
clienteRouter.delete('/:cedula', ClienteController.delete);
clienteRouter.patch('/passwordupdate/:cedula', ClienteController.updatePassword);

export default clienteRouter;