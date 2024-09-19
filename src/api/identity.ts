import { createPromiseClient } from "@connectrpc/connect";
import { IdentityService } from "./serviceapis/identity/v1/identity_connect";
import { createConnectTransport } from "@connectrpc/connect-node";
import { env } from "@/env";

const connectTransport = createConnectTransport({
  baseUrl: env.IDENTITY_URL,
  httpVersion: "2",
});

const identityClient = createPromiseClient(IdentityService, connectTransport);

export { identityClient };
