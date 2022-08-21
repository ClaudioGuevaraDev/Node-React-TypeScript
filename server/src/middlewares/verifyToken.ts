import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  try {
    jwt.verify(token, JWT_SECRET_KEY);
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
