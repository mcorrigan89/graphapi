import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";
import { typeDefs } from "@/schema/typeDefs.generated";
import { resolvers } from "@/schema/resolvers.generated";
import { getToken, SESSION_KEY } from "@/session";
import { logger } from "./logger";
import { useOpenTelemetry } from "@envelop/opentelemetry";
import { trace } from "@opentelemetry/api";

export interface ServerContext {
  logger: typeof logger;
  token: string | undefined;
  connectConfig: {
    headers: Record<typeof SESSION_KEY, string>;
  };
}

const yoga = createYoga({
  schema: createSchema<ServerContext>({ typeDefs, resolvers }),
  landingPage: false,
  context: async ({ request }) => {
    const token = getToken(request);
    const contextLogger = logger.child({ token });
    return {
      token: token ?? undefined,
      logger: contextLogger,
      connectConfig: {
        headers: {
          [SESSION_KEY]: token || "",
        },
      },
    };
  },
  plugins: [
    useOpenTelemetry(
      {
        resolvers: true, // Tracks resolvers calls, and tracks resolvers thrown errors
        variables: true, // Includes the operation variables values as part of the metadata collected
        result: true, // Includes execution result object as part of the metadata collected
      },
      trace.getTracerProvider()
    ),
  ],
});
export const server = createServer(yoga);
