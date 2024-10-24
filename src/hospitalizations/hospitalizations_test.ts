import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import Client from "../client/client.ts";
import "@std/dotenv/load";

let client: Client;

describe("hospitalizace endpoints", () => {
  beforeAll(() => {
    client = new Client({
      token: Deno.env.get("CLIENT_TOKEN"),
    });
  });

  describe("/api/v3/hospitalizace", () => {
    it("happy - calling endpoint with defaults returns data", async () => {
      const [data, err] = await client.hospitalization.getHospitalizationsV3();

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(100);
    });

    it("happy - calling endpoint with custom query params returns data", async () => {
      const [data, err] = await client.hospitalization.getHospitalizationsV3({
        page: 2,
        itemsPerPage: 10,
        datumAfter: "01.01.2024",
        datumBefore: "20.10.2024",
      });

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(10);
    });

    it("happy - calling with future date returns empty array", async () => {
      const [data, err] = await client.hospitalization.getHospitalizationsV3({
        page: 1,
        itemsPerPage: 10,
        datumAfter: new Date(new Date().setHours(new Date().getHours() + 48)).toLocaleDateString(),
      });

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(0);
    });

    it("unhappy - calling endpoint for page=-1 returns error as value", async () => {
      const [data, err] = await client.hospitalization.getHospitalizationsV3({
        page: -1,
      });

      expect(err).toBeInstanceOf(Error);
      expect(data).toBeNull();
    });
  });

  describe("/api/v3/hospitalizace/:id", () => {
    it("happy - calling for specific id returns data object", async () => {
      const [data, err] = await client.hospitalization.getHospitalizationsV3({ itemsPerPage: 1 });

      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(1);
      expect(err).toBeNull();

      const [idData, error] = await client.hospitalization.getHospitalizationOfId({
        // @ts-expect-error data can be null but we want to test it
        id: data[0]["id"],
      });

      expect(error).toBeNull();
      expect(idData).toHaveProperty("id");
    });
  });
});