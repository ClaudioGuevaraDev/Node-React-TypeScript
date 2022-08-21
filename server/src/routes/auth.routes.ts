import { Router } from "express";
import { authRegister } from "../controllers/auth.controllers";

const router = Router();

router.post("/register", authRegister);

export default router;
