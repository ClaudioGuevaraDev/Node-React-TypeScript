import { Request, Response, NextFunction } from "express";

export const checkCookie = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token) return res.status(401).json({ message: "Unauthorized." });

  next();
};
