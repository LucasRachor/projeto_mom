import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./router.ts";
import cors from "cors";
import { errorHandler } from "./errors/error-handler.ts";
dotenv.config();

const app: Application = express();
const port = process.env.PORT

app.use(express.json());
app.use(router);
app.use(cors());
app.use(errorHandler);

app.listen(port, () => {
  console.log(`🍵☕️🐓 Servidor rodando na porta: ${port}`);
});