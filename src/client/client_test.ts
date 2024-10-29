import "@std/dotenv/load";
import { assertExists } from "@std/assert";
import Client from "./client.ts";
Deno.test("client instance has the token", () => {
  const client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  // @ts-expect-error token is private but we want to test it
  assertExists(client.token);
});
