import { Request, Response } from "express";

export const authRegister = (req: Request, res: Response) => {
    console.log(req.body)

  res.status(201).json({ message: "Usuario registrado con éxito." });
};
