import express from "express"
import cors from 'cors';
import categoriaRouter from "./routes/categoria.routes.ts";
import idiomaRouter from "./routes/idioma.routes.ts";
import clasificacionRouter from "./routes/clasificacion.routes.ts";
import participanteRouter from "./routes/participante.routes.ts";
import serieRouter from "./routes/serie.routes.ts";
import coleccionRouter from "./routes/coleccion.routes.ts";
import clienteRouter from "./routes/cliente.routes.ts";

const app = express();

app.use(express.json());
app.use(cors());

//Rutas
app.use('/api/categorias', categoriaRouter);
app.use('/api/idiomas', idiomaRouter);
app.use('/api/clasificaciones', clasificacionRouter);
app.use('/api/participantes', participanteRouter);
app.use('/api/series', serieRouter);
app.use('/api/colecciones', coleccionRouter);
app.use('/api/clientes', clienteRouter);

export default app;