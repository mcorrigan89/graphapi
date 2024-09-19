import { identityClient } from "@/api/identity";
import type { QueryResolvers } from "./../../../types.generated";
import { Code, ConnectError } from "@connectrpc/connect";
export const me: NonNullable<QueryResolvers["me"]> = async (
  _parent,
  _arg,
  ctx
) => {
  ctx.logger.info("Getting Current User", { token: ctx.token });
  try {
    const response = await identityClient.getUserBySessionToken(
      {
        token: ctx.token,
      },
      ctx.connectConfig
    );

    if (!response.user) {
      ctx.logger.warn("Error getting current user");
      throw new Error("Error getting current user");
    }

    return {
      __typename: "User",
      id: response.user.id,
      givenName: response.user.givenName,
      familyName: response.user.familyName,
      email: response.user.email,
    };
  } catch (e) {
    if (e instanceof ConnectError) {
      switch (e.code) {
        case Code.NotFound:
          ctx.logger.warn("User not found", { token: ctx.token });
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
