import { createConnectTransport } from "@connectrpc/connect-node";

const connectTransport = createConnectTransport({
  baseUrl: "http://localhost:4000",
  httpVersion: "2",
});

export { connectTransport };
