import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import "@std/dotenv/load";
import Client from "../index.ts";

let client: Client;

describe("vaccination deaths", () => {
  beforeAll(() => {
    client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("deaths", () => {
    it("happy - call endpoint with default params returns data", async () => {
      const [data, err] = await client.vaccinationDeaths
        .getVaccinationDeathsV3();

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(100);
    });

    it("happy - call endpoint with custom params returns data", async () => {
      const [data, err] = await client.vaccinationDeaths
        .getVaccinationDeathsV3({
          page: 100,
          itemsPerPage: 2,
          datumStrictlyAfter: "2022-01-01",
        });

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(2);
    });
  });

  describe("deaths of id", () => {
    it("happy - call endpoint with specific id returns data", async () => {
      const [_data] = await client.vaccinationDeaths
        .getVaccinationDeathsV3({ itemsPerPage: 1 });
      const [data, err] = await client.vaccinationDeaths
        // @ts-expect-error test
        .getVaccinationDeathsOfIdV3({ id: _data[0].id });

      expect(err).toBeNull();
      expect(data).toHaveProperty("id");
    });
  });
});
