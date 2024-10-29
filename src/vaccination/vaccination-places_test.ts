import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import Client from "../index.ts";
import "@std/dotenv/load";

let client: Client;

describe("vaccination places", () => {
  beforeAll(() => {
    client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("vaccination places", () => {
    it("happy - call endpoint with defaults returns data", async () => {
      const [data, err] = await client.vaccinationPlaces
        .getVaccinationPlacesV3();

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(100);
    });

    it("happy - call endpoint with custom params returns data", async () => {
      const [data, err] = await client.vaccinationPlaces
        .getVaccinationPlacesV3({
          page: 100,
          itemsPerPage: 5,
          datumStrictlyAfter: "2024-01-01",
          krajNutsKod: "CZ020",
        });

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(5);
    });
  });

  describe("vaccination places of id", () => {
    it("happy - call endpoint with specific id returns data", async () => {
      const [_data] = await client.vaccinationPlaces
        .getVaccinationPlacesV3({
          itemsPerPage: 1,
        });
      const [data, err] = await client.vaccinationPlaces
        // @ts-expect-error test
        .getVaccinationPlacesOfIdV3({ id: _data[0].id });

      expect(err).toBeNull();
      expect(data).toHaveProperty("id");
    });
  });
});
