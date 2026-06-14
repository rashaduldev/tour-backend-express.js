import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { authRoutes } from "./app/modules/auth/auth.routes.js";
import { userRoutes } from "./app/modules/user/user.routes.js";
import { swaggerSpec } from "./app/config/swagger.js";

const app = express();

app.use(
  cors({
    origin: (process.env.CORS_ORIGIN ?? "http://localhost:3000").split(","),
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Tour booking Express server!",
  });
});

// Swagger API docs
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => {
  res.status(200).json(swaggerSpec);
});

// Auth + user routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
});

// Central error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Error:", err);
  res.status(500).json({ message: "Internal server error", error: err.message });
});

export default app;
