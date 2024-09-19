import { createPromiseClient } from "@connectrpc/connect";
import { connectTransport } from "./transport";
import { IdentityService } from "./serviceapis/identity/v1/identity_connect";

const identityClient = createPromiseClient(IdentityService, connectTransport);

export { identityClient };
