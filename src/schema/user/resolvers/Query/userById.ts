import { Code, ConnectError } from "@connectrpc/connect";
import { identityClient } from "../../../../api/identity";
import type { QueryResolvers } from "./../../../types.generated";
import { SESSION_KEY } from "../../../../session";
export const userById: NonNullable<QueryResolvers["userById"]> = async (
  _parent,
  arg,
  ctx
) => {
  ctx.logger.info("Getting User by ID", { id: arg.id });
  try {
    const response = await identityClient.getUserById(
      {
        id: arg.id,
      },
      ctx.connectConfig
    );

    if (!response.user) {
      ctx.logger.warn("Error getting User by ID");
      throw new Error("Error getting User by ID");
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
          ctx.logger.warn("User not found", { id: arg.id });
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
