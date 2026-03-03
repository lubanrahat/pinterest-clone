import express, { type Application } from "express";
import connectDB from "./app/lib/db";
import { logger } from "./app/shared/logger/logger";

 function createApp(): Application {
  const app = express();
    // Connect to the database
    connectDB().catch((error) => {
      logger.error("Failed to connect to the database:", error);
      process.exit(1);
    });
  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));



  return app;
}

export default createApp;