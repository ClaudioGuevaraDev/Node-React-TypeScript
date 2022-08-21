import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

import { prisma } from "../db/prisma";
import { comparePassword } from "../utils/comparePassword";
import { encryptPassword } from "../utils/encryptPassword";
import { JWT_SECRET_KEY } from "../config";

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

    return res.status(201).json({ message: "User register success." });
  } catch (error) {
    return res.status(500).json({ message: "Error to register user." });
  }
};

export const authLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const userFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!userFound) return res.status(401).json({ message: "Login error." });

  if ((await comparePassword(password, userFound.password)) === false)
    return res.status(401).json({ message: "Login error." });

  try {
    const token = jwt.sign(
      {
        id: userFound.id,
        username: userFound.username,
      },
      JWT_SECRET_KEY
    );

    const serializedToken = serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24,
      path: "/",
    });
    res.setHeader("Set-Cookie", serializedToken);

    return res.status(200).json({ message: "Login successfully." });
  } catch (error) {
    return res.status(401).json({ message: "Login error." });
  }
};

export const authCheckUserLogged = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token) return res.status(200).json({ logged: false });

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    return res.status(200).json({ logged: true, userDecoded: decoded });
  } catch (error) {
    return res.status(200).json({ logged: false });
  }
};

export const authLogout = async (req: Request, res: Response) => {
  try {
    const serializedToken = serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "produciton",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serializedToken);

    return res.status(200).json({ message: "Logout succesfully." });
  } catch (error) {
    return res.status(500).json({ message: "Logout error." });
  }
};
