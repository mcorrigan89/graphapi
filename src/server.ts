import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";
import { typeDefs } from "@/schema/typeDefs.generated";
import { resolvers } from "@/schema/resolvers.generated";
import { getToken, SESSION_KEY } from "@/session";
import { logger } from "./logger";

export interface ServerContext {
  logger: typeof logger;
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
      logger: contextLogger,
      connectConfig: {
        headers: {
          [SESSION_KEY]: token || "",
        },
      },
    };
  },
});
export const server = createServer(yoga);
