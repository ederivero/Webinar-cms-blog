import { Router } from "express";
import {
  actualizar,
  crear,
  devolverUnitario,
  eliminar,
  listar,
} from "../controllers/post";
import { authValidator } from "../utils/validador";

export const postRouter = Router();

postRouter.route("/posts").post(authValidator, crear).get(listar);
postRouter
  .route("/post/:id")
  .get(devolverUnitario)
  .put(authValidator, actualizar)
  .delete(authValidator, eliminar);
