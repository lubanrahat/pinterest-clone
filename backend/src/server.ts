import http from "http";
import { config } from "./app/config/env";
import createApp from "./app";
import { logger } from "./app/shared/logger/logger";

function main() {
  try {
    const port = +(config.app.port ?? 8080);
    const server = http.createServer(createApp());
    server.listen(port, () => {
      logger.info(`Server is running on port ${port} in ${config.app.nodeEnv} mode`);
    });
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
}

main();
