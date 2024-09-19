import { Code, ConnectError } from "@connectrpc/connect";
import { identityClient } from "../../../../api/identity";
import type { MutationResolvers } from "./../../../types.generated";
export const createUser: NonNullable<MutationResolvers['createUser']> = async (
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
      ctx.connectConfig
    );

    if (!response.user) {
      ctx.logger.warn("Error Creating User");
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
          ctx.logger.warn("Email not available", { email: arg.payload.email });
          return {
            __typename: "EmailUnavailable",
            code: 409,
            message: "Email not available",
          };
        case Code.Unavailable:
          ctx.logger.warn("User already created, please login", {
            email: arg.payload.email,
          });
          return {
            __typename: "UserAlreadyCreated",
            code: 409,
            message: "User already created, please login",
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
