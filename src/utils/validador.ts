import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

export interface RequestUser extends Request {
  user?: any;
}

interface IPayload extends JwtPayload {
  id?: number;
}

const prisma = new PrismaClient();

const verificarToken = (token: string): IPayload | string => {
  try {
    const payload = verify(token, String(process.env.SECRET_JWT));
    return payload;
  } catch (error: any) {
    return error.message;
  }
};

export const authValidator = async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      success: false,
      content: null,
      message: "Se necesita una token para este request",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  const resultado = verificarToken(token);

  if (typeof resultado === "object") {
    const id = resultado.id;
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    req.user = usuario;
    next();
  } else {
    return res.status(401).json({
      success: false,
      content: resultado,
      message: "Token invalida",
    });
  }
};
