import * as dotenv from "dotenv";
import { cleanEnv, port, str, testOnly } from "envalid";

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    devDefault: testOnly("test"),
    choices: ["development", "production", "test"],
  }),
  PORT: port({ devDefault: testOnly(4001) }),
  IDENTITY_URL: str({ devDefault: testOnly("http://identity:4000") }),
  OTEL_SERVICE_NAME: str({ devDefault: testOnly("graphapi-service") }),
  OTEL_EXPORTER_OTLP_ENDPOINT: str({
    devDefault: testOnly("http://localhost:4317"),
  }),
});

export { env };
