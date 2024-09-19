import { Code, ConnectError } from "@connectrpc/connect";
import { identityClient } from "../../../../api/identity";
import type { MutationResolvers } from "./../../../types.generated";
export const createUser: NonNullable<MutationResolvers["createUser"]> = async (
  _parent,
  arg,
  ctx
) => {
  try {
    const response = await identityClient.createUser(
      {
        givenName: arg.payload.givenName ?? undefined,
        familyName: arg.payload.familyName ?? undefined,
        email: arg.payload.email,
        password: arg.payload.password,
      },
      ctx
    );

    if (!response.user) {
      throw new Error("Error Creating User");
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
        case Code.AlreadyExists:
          return {
            __typename: "EmailUnavailable",
            code: 409,
            message: "Email not available",
          };
        case Code.Unavailable:
          return {
            __typename: "UserAlreadyCreated",
            code: 409,
            message: "User already created, please login",
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
