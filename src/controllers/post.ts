import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { paginationSerializer } from "../utils/utils";

const prisma = new PrismaClient();

export const crear = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.create({ data: { ...req.body } });
    return res.status(201).json({
      success: true,
      content: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
};

export const listar = async (req: Request, res: Response) => {
  const { pagina, porPagina } = req.query;
  const perPage = porPagina ? +porPagina : 5;
  const page = pagina ? +pagina : 1;
  const take = perPage;
  const skip = (page - 1) * perPage;

  const [count, data] = await Promise.all([
    prisma.post.count(),
    prisma.post.findMany({ skip, take, include: { usuario: true } }),
  ]);

  const pageInfo = paginationSerializer(count, { page, perPage });

  return res.status(200).json({
    success: true,
    data: {
      data,
      pageInfo,
    },
  });
};

export const eliminar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.delete({ where: { id: +id } });

    return res.status(200).json({
      success: true,
      content: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
};

export const devolverUnitario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.findUnique({
      where: { id: +id },
      include: { usuario: true },
    });

    return res.status(200).json({
      success: true,
      content: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
};

export const actualizar = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const post = await prisma.post.update({
      where: { id: +id },
      data: { ...req.body },
      include: { usuario: true },
    });

    return res.status(201).json({
      success: true,
      content: post,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      content: error,
    });
  }
};
