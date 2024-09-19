import { identityClient } from "@/api/identity";
import type { MutationResolvers } from "./../../../types.generated";
import { Code, ConnectError } from "@connectrpc/connect";
export const authenticateWithGoogleCode: NonNullable<MutationResolvers['authenticateWithGoogleCode']> = async (_parent, arg, ctx) => {
  try {
    const response = await identityClient.authenticateWithGoogleCode(
      {
        code: arg.payload.code,
      },
      ctx.connectConfig
    );

    if (!response.session) {
      ctx.logger.warn("Error authenticating with google");
      throw new Error("Error authenticating with google");
    }

    return {
      __typename: "UserSession",
      token: response.session.token,
      expiresAt: response.session.expiresAt,
    };
  } catch (e) {
    if (e instanceof ConnectError) {
      switch (e.code) {
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
