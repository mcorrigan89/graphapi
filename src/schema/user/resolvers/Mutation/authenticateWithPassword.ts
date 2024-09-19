import { identityClient } from "@/api/identity";
import type { MutationResolvers } from "./../../../types.generated";
import { Code, ConnectError } from "@connectrpc/connect";
export const authenticateWithPassword: NonNullable<MutationResolvers['authenticateWithPassword']> = async (_parent, arg, ctx) => {
  try {
    const response = await identityClient.authenticateWithPassword(
      {
        email: arg.payload.email,
        password: arg.payload.password,
      },
      ctx.connectConfig
    );

    if (!response.session) {
      ctx.logger.warn("Error authenticating with password");
      throw new Error("Error authenticating with password");
    }

    return {
      __typename: "UserSession",
      token: response.session.token,
      expiresAt: response.session.expiresAt,
    };
  } catch (e) {
    if (e instanceof ConnectError) {
      switch (e.code) {
        case Code.Unauthenticated:
          ctx.logger.warn("Invalid credentials", { email: arg.payload.email });
          return {
            __typename: "InvalidCredentials",
            code: 409,
            message: "Invalid credentials",
          };
        case Code.NotFound:
          ctx.logger.warn("User not found", {
            email: arg.payload.email,
          });
          return {
            __typename: "UserNotFound",
            code: 404,
            message: "User not found",
          };
        default:
          ctx.logger.error(e);
          return {
            __typename: "UnknownError",
            code: 500,
            message: e.message,
          };
      }
    } else {
      ctx.logger.error(e);
      throw e;
    }
  }
};
