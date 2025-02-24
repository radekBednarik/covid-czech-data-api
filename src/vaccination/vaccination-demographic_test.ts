import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import "@std/dotenv/load";
import Client from "../index.ts";

let client: Client;

describe("vaccination demographic", () => {
  beforeAll(() => {
    client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("demographic", () => {
    it("happy - call endpoint with defaults returns data", async () => {
      const [data, err] = await client.vaccinationDemographic
        .getVaccinationDemographicDataV3();

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(100);
    });

    it("happy - call endpoint with custom params returns data", async () => {
      const [data, err] = await client.vaccinationDemographic
        .getVaccinationDemographicDataV3({
          page: 50,
          itemsPerPage: 2,
          pohlavi: "M",
        });

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(2);
    });
  });

  describe("demographic of id", () => {
    it("happy - call endpoint with specific id returns data", async () => {
      const [_data] = await client.vaccinationDemographic
        .getVaccinationDemographicDataV3(
          { itemsPerPage: 1 },
        );

      const [data, err] = await client.vaccinationDemographic
        // @ts-expect-error test
        .getVaccinationDemographicDataOfIdV3({ id: _data[0].id });

      expect(err).toBeNull();
      expect(data).toHaveProperty("id");
    });
  });
});
