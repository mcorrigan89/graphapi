import { Code, ConnectError } from "@connectrpc/connect";
import { identityClient } from "../../../../api/identity";
import type { MutationResolvers } from "./../../../types.generated";
export const createUser: NonNullable<MutationResolvers["createUser"]> = async (
  _parent,
  arg,
  _ctx
) => {
  try {
    const response = await identityClient.createUser({
      givenName: arg.payload.givenName ?? undefined,
      familyName: arg.payload.familyName ?? undefined,
      email: arg.payload.email,
      password: arg.payload.password,
    });

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
      if (e.code === Code.AlreadyExists) {
        return {
          __typename: "EmailUnavailable",
          code: 409,
          message: "Email not available",
        };
      } else {
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
