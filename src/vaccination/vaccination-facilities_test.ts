import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import Client from "../index.ts";
import "@std/dotenv/load";

let client: Client;

describe("vaccination facilities", () => {
  beforeAll(() => {
    client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("facilities", () => {
    it("happy - call endpoint with default params returns data", async () => {
      const [data, err] = await client.vaccinationFacilities
        .getVaccinationFacilitiesV3();

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(100);
    });

    it("happy - call endpoint with custom params returns data", async () => {
      const [data, err] = await client.vaccinationFacilities
        .getVaccinationFacilitiesV3({
          page: 2,
          itemsPerPage: 10,
          praktickyLekar: true,
          praktickyLekarDospeli: true,
        });

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(10);
    });
  });

  describe("facilities of id", () => {
    it("happy - call endpoint with specific id returns data", async () => {
      const [_data] = await client.vaccinationFacilities
        .getVaccinationFacilitiesV3({ itemsPerPage: 1 });
      const [data, err] = await client.vaccinationFacilities
        // @ts-expect-error test
        .getVaccinationFacilitiesOfIdV3({ id: _data[0].id });

      expect(err).toBeNull();
      expect(data).toHaveProperty("id");
    });
  });
});
