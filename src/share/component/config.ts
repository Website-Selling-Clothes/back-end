import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

export const config = {
  postgres: {
    database: process.env.POSTGRES_DB || "",
    username: process.env.POSTGRES_USER || "",
    password: process.env.POSTGRES_PASSWORD || "",
    host: process.env.POSTGRES_HOST || "",
    port: parseInt(process.env.POSTGRES_PORT as string, 10) || 5432,
    dialectModule: pg,
    dialect: "postgres",
    pool: {
      max: 20,
      min: 2,
      acquire: 30000,
      idle: 60000,
    },
    // logging: true,
  },
  accessToken: {
    secretKey: process.env.JWT_SECRET_KEY || "200L@b.io",
    expiresIn: "7d",
  },
};
