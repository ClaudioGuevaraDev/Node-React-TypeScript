import { Router } from "express";
import {
  authCheckUserLogged,
  authLogin,
  authLogout,
  authRegister,
} from "../controllers/auth.controllers";

const router = Router();

router.get("/check-user-logged", authCheckUserLogged);
router.get("/logout", authLogout);

router.post("/register", authRegister);
router.post("/login", authLogin);

export default router;
