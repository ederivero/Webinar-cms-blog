import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashSync, compareSync } from "bcrypt";
import { sign } from "jsonwebtoken";

const prisma = new PrismaClient();

const generarToken = (payload: Object): string => {
  return sign(payload, process.env.SECRET_JWT ?? "", { expiresIn: "1h" });
};

export const registro = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { correo, nombre, password } = req.body;

  const password_encrypted = hashSync(password, 10);
  try {
    const usuario = await prisma.usuario.create({
      data: { correo, nombre, password: password_encrypted },
    });

    const jwt = generarToken({
      id: usuario.id,
      nombre: usuario.nombre,
    });

    return res.status(201).json({
      success: true,
      content: jwt,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      content: error,
      message: "Error al crear el usuario",
    });
  }
};

export const login = async (req: Request, res: Response): Promise<Response> => {
  const { correo, password } = req.body;

  const usuario = await prisma.usuario.findUnique({
    where: { correo },
    rejectOnNotFound: false,
  });

  if (!usuario) {
    return res.status(500).json({
      sucess: false,
      content: null,
      message: "Credenciales incorrectas",
    });
  }
  const compare = compareSync(password, usuario.password);
  if (!compare) {
    return res.status(500).json({
      sucess: false,
      content: null,
      message: "Credenciales incorrectas",
    });
  }

  const jwt = generarToken({
    id: usuario.id,
    nombre: usuario.nombre,
  });

  return res.status(200).json({
    success: true,
    content: jwt,
  });
};
