import { config } from "dotenv";

config();

export const PORT = process.env.PORT || "4000";
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";
export const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
