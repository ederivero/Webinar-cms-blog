import express, {
  Express,
  json,
  NextFunction,
  Request,
  Response,
} from "express";
import { autorRouter } from "../routes/autor";
import { postRouter } from "../routes/post";
import { usuarioRouter } from "../routes/usuario";
export default class Server {
  app: Express;
  port: Number | String;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8000;
    this.CORS();
    this.bodyParser();
    this.routes();
  }

  CORS() {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      // Access-Control-Allow-Origin => indicar que origenes (dominios pueden acceder a mi API)
      res.header("Access-Control-Allow-Origin", "*");
      // Access-Control-Allow-Headers => indicar que tipos de cabeceras pueden ser enviadas
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
      // Access-Control-Allow-Methods => indica que metodos pueden ser intentar acceder a mi backend
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
      // si es que cumple el origen (dominio), el header Y el metodo entonces daremos paso al controlador solicitado
      next();
    });
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
