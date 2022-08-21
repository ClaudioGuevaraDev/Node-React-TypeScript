import { Router } from "express";
import {
  authCheckUserLogged,
  authLogin,
  authRegister,
} from "../controllers/auth.controllers";

const router = Router();

router.get("/check-user-logged", authCheckUserLogged);

router.post("/register", authRegister);
router.post("/login", authLogin);

export default router;
