import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import Client from "../index.ts";
import "@std/dotenv/load";

let client: Client;

describe("deaths apis", () => {
  beforeAll(() => {
    client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("deaths", () => {
    it("happy - call endpoint with defaults returns data", async () => {
      const [data, err] = await client.deaths.getDeathsV3();

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(100);
    });

    it("happy - call endpoint with custom params returns data", async () => {
      const [data, err] = await client.deaths.getDeathsV3({
        page: 20,
        itemsPerPage: 10,
        datumAfter: "2024-01-01",
        vekGt: "18",
      });

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(10);
    });
  });

  describe("deaths of id", () => {
    it("happy - call endpoint with id returns data", async () => {
      const [_data] = await client.deaths.getDeathsV3({ itemsPerPage: 1 });
      const [data, err] = await client.deaths.getDeathsOfIdV3({
        // @ts-expect-error test
        id: _data[0].id,
      });

      expect(err).toBeNull();
      expect(data).toHaveProperty("id");
    });
  });
});
