import { getApi } from "./api.ts";
import { describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import "@std/dotenv/load";

describe("getApi function", () => {
  it("happy - call to endpoint works", async () => {
    const endpoint = "/api/v3/hospitalizace";
    const searchParams = new URLSearchParams({
      page: "1",
      itemsPerPage: "10",
    });
    const token = Deno.env.get("CLIENT_TOKEN") as string;

    const [data, err] = await getApi(endpoint, token, searchParams);

    expect(err).toBeNull();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveLength(10);
  });

  it("unhappy - call to nonexistent endpoint handles error", async () => {
    const endpoint = "/api/v3/hospitalizac";
    const searchParams = new URLSearchParams({
      page: "1",
      itemsPerPage: "10",
    });
    const token = Deno.env.get("CLIENT_TOKEN") as string;

    const [data, err] = await getApi(endpoint, token, searchParams);

    expect(err).not.toBeNull();
    expect(err).toBeInstanceOf(Error);
    expect(data).toBeNull();
  });
});
