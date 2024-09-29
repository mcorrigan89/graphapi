import { env } from "@/env";
import "./tracing";
import { server } from "@/server";
import { logger } from "./logger";

server.listen(env.PORT, () => {
  logger.info(`Server is running on http://localhost:${env.PORT}`);
});
