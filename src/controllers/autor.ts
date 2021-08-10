import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crear = async (req: Request, res: Response): Promise<Response> => {
  try {
    const autor = await prisma.autor.create({ data: { ...req.body } });
    return res.status(201).json({
      success: true,
      content: autor,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
};

export const listar = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const autores = await prisma.autor.findMany();
  return res.status(201).json({
    success: true,
    content: autores,
  });
};
