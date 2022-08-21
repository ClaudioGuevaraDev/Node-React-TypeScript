import { Request, Response } from "express";
import { prisma } from "../db/prisma";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";

export const getAllStasks = async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        user: {
          select: {
            email: true,
            username: true,
            id: true,
          },
        },
      },
    });
    return res.status(200).json({ tasks: tasks });
  } catch (error) {
    return res.status(500).json({ message: "Error to list tasks." });
  }
};

export const getSpecificTasks = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

  const tasks = await prisma.task.findMany({
    where: {
      userId: decoded.id,
    },
    include: {
      user: {
        select: {
          email: true,
          username: true,
          id: true,
        },
      },
    },
  });

  return res.status(200).json({ tasks: tasks });
};

export const createTask = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

  const userFound = await prisma.user.findUnique({
    where: {
      id: decoded.id,
    },
  });

  if (!userFound) return res.status(404).json({ message: "User not found." });

  const { title, description } = req.body;

  const taskFound = await prisma.task.findUnique({
    where: {
      title,
    },
  });
  if (taskFound)
    return res.status(400).json({ message: "Task already exists." });

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        userId: decoded.id,
      },
    });
    return res.status(201).json({ message: "Task created." });
  } catch (error) {
    return res.status(500).json({ message: "Error to create the task." });
  }
};
