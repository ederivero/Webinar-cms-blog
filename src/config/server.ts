import express, { Express, json } from "express";
import { autorRouter } from "../routes/autor";
import { postRouter } from "../routes/post";
import { usuarioRouter } from "../routes/usuario";
export default class Server {
  app: Express;
  port: Number | String;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.bodyParser();
    this.routes();
  }

  bodyParser() {
    this.app.use(json());
  }

  routes() {
    this.app.use("", usuarioRouter, autorRouter, postRouter);
  }
  start() {
    this.app.listen(this.port, () => {
      console.log(`Servidor corriendo exitosamente en ${this.port}`);
    });
  }
}
