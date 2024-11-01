import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import "@std/dotenv/load";
import Client from "../index.ts";

let client: Client;

describe("helpers", () => {
  beforeAll(() => {
    client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("call sequentially same api endpoint", () => {
    it("happy - hospitalizations - should return data of all called pages", async () => {
      const result = await client.helpers.sequential.callEndpoint(
        client.hospitalization.getHospitalizationsV3,
        { pages: { start: 1, end: 10 }, itemsPerPage: 1 },
      );

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(10);
      expect(result[0]).toBeInstanceOf(Array);
      expect(result[0][1]).toBeNull();
      expect(result[0][0]).toHaveLength(1);
    });

    it("happy - deaths - should return data of all called pages", async () => {
      const result = await client.helpers.sequential.callEndpoint(
        client.deaths.getDeathsV3,
        { pages: { start: 5, end: 20 }, itemsPerPage: 1 },
      );

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(16);
      expect(result[0]).toBeInstanceOf(Array);
      expect(result[0][1]).toBeNull();
      expect(result[0][0]).toHaveLength(1);
    });

    it("happy - deaths - do not provide pages.start and itemsPerPage options returns data", async () => {
      const result = await client.helpers.sequential.callEndpoint(
        client.deaths.getDeathsV3,
        { pages: { end: 2 } },
      );

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Array);
      expect(result[0][1]).toBeNull();
      expect(result[0][0]).toHaveLength(100);
    });

    it("happy - hospitalizations - should return data of all called pages with 1 second wait after each call", async () => {
      const result = await client.helpers.sequential.callEndpoint(
        client.hospitalization.getHospitalizationsV3,
        { pages: { end: 2 }, itemsPerPage: 1, waitAfterCall: 1000 },
      );

      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(2);
      expect(result[0]).toBeInstanceOf(Array);
      expect(result[0][1]).toBeNull();
      expect(result[0][0]).toHaveLength(1);
    });
  });
});
