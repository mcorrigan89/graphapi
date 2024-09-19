import { Code, ConnectError } from "@connectrpc/connect";
import { identityClient } from "../../../../api/identity";
import type { QueryResolvers } from "./../../../types.generated";
import { SESSION_KEY } from "../../../../session";
export const userById: NonNullable<QueryResolvers["userById"]> = async (
  _parent,
  arg,
  ctx
) => {
  try {
    const response = await identityClient.getUserById(
      {
        id: arg.id,
      },
      ctx
    );

    if (!response.user) {
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
          return {
            __typename: "UserNotFound",
            code: 404,
            message: "User not found",
          };
        default:
          return {
            __typename: "UnknownError",
            code: 500,
            message: e.message,
          };
      }
    } else {
      throw e;
    }
  }
};
