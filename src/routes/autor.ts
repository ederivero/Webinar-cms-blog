import { Router } from "express";
import { crear, listar } from "../controllers/autor";
import { authValidator } from "../utils/validador";

export const autorRouter = Router();

autorRouter.route("/autor").post(authValidator, crear).get(listar);
