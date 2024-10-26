import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import Client from "../index.ts";
import "@std/dotenv/load";

let client: Client;

describe("vaccination aggregated", () => {
  beforeAll(() => {
    client = new Client({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("vaccination", () => {
    it("happy - call endpoint with defaults returns data", async () => {
      const [data, err] = await client.vaccinationAggregated
        .getVaccinationV3();

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(100);
    });

    it("happy - call endpoint with custom params returns data", async () => {
      const [data, err] = await client.vaccinationAggregated
        .getVaccinationV3({
          page: 50,
          itemsPerPage: 2,
          vekovaSkupina: "40-44",
        });

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(2);
    });
  });

  describe("vaccination of id", () => {
    it("happy - call endpoint with specific id returns data", async () => {
      const [_data] = await client.vaccinationAggregated.getVaccinationV3(
        { itemsPerPage: 1 },
      );

      const [data, err] = await client.vaccinationAggregated
        // @ts-expect-error test
        .getVaccinationOfIdV3({ id: _data[0].id });

      expect(err).toBeNull();
      expect(data).toHaveProperty("id");
    });
  });
});
