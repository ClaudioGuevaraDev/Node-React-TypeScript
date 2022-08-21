import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../db/prisma";
import { encryptPassword } from "../utils/encryptPassword";

export const authRegister = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const usernameFound = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (usernameFound)
    return res.status(400).json({ message: "Username already exists." });

  const emailFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (emailFound)
    return res.status(400).json({ message: "Email already exists." });

  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password: await encryptPassword(password),
      },
    });

    res.status(201).json({ message: "User register success." });
  } catch (error) {
    return res.status(500).json({ message: "Error to register user." });
  }
};
