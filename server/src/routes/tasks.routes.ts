import { Router } from "express";
import {
  createTask,
  getAllStasks,
  getSpecificTasks,
} from "../controllers/tasks.controller";
import { checkCookie } from "../middlewares/checkCookie";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.get("/all", getAllStasks);
router.get("/specific", [checkCookie, verifyToken], getSpecificTasks);
router.post("/", [checkCookie, verifyToken], createTask);

export default router;
