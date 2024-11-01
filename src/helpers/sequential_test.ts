import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import "@std/dotenv/load";
import Client from "../index.ts";

let client: Client;

describe("helpers", () => {
  beforeAll(() => {
    client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("call sequentially same api endpoint - hospitalizations", () => {
    it("happy - should return data of all called pages", async () => {
      console.log(client);
      const result = await client.helpers.sequentialSameApi.call(
        client.hospitalization.getHospitalizationsV3,
        { pages: { start: 1, end: 10 }, itemsPerPage: 1 },
      );

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(10);
      expect(result[0]).toBeInstanceOf(Array);
      expect(result[0][1]).toBeNull();
      expect(result[0][0]).toHaveLength(1);
    });
  });
});
