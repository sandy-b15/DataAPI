import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "your-secret-key",
  db: {
    user: process.env.DB_USER || "postgres",
    host: process.env.DB_HOST || "localhost",
    database: process.env.DB_NAME || "api_platform",
    password: process.env.DB_PASSWORD || "root",
    port: parseInt(process.env.DB_PORT || "5432"),
    ssl: process.env.DB_SSL === "true",
  },
  cors: {
    origin:
      "https://4ecf-2405-201-d032-885a-55ea-b461-e20e-3d70.ngrok-free.app" ||
      process.env.CORS_ORIGIN ||
      "http://localhost:5173",
  },
};
