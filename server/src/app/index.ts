import express from "express";
import morgan from "morgan";
import cors from "cors";
import { PORT } from "../config";

// Server initialized
const app = express();

// Global Variables
app.set("port", PORT);

// Middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
