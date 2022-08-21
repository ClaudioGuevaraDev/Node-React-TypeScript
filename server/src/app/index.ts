import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import { FRONTEND_URL, PORT } from "../config";
import { authRoutes } from "../routes";

// Server initialized
const app = express();

// Global Variables
app.set("port", PORT);

// Middlewares
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
);
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;
