import { config } from "dotenv";
config();

export const MONGODB_URI = "mongodb+srv://tadinhtai6868:t6pbXYK6iqoRZFri@cluster0.0594gvd.mongodb.net/company";
export const PORT = process.env.PORT || 4000;
export const SECRET = "yoursecretkey";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@localhost";
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";