import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "../config";
import { authRoutes } from "../routes";

// Server initialized
const app = express();

// Global Variables
app.set("port", PORT);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

export default app;
