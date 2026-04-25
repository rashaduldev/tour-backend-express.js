import { Server } from "http";

import mongoose from "mongoose";
import app from "./app.js";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://rashaduldev_db_user:rashaduldev_db_pass@cluster0.kezdou4.mongodb.net/tour-db?appName=Cluster0",
    );
    console.log("Connected to MongoDB");

    server = app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};
startServer();

process.on("SIGINT", async () => {
  console.log("SIGINT received. Shutting down server...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("SIGTERM", async () => {
  console.log("SIGTERM received. Shutting down server...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", async (error) => {
  console.error("Uncaught Exception:", error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("unhandledRejection", async (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
