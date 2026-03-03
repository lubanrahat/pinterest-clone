import mongoose from "mongoose";
import { config } from "../config/env";
import { logger } from "../shared/logger/logger";

const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = config.database.url;

    if (!mongoURI) {
      logger.error(
        "MongoDB connection URI is not defined in environment variables",
      );
      process.exit(1); 
    }

    await mongoose.connect(mongoURI);

    logger.info("✅ MongoDB connected successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      logger.error(`❌ MongoDB connection failed: ${error.message}`);
    } else {
      logger.error("❌ Unknown MongoDB connection error");
    }

    process.exit(1); 
  }
};

export default connectDB;
