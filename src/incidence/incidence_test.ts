import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import "@std/dotenv/load";
import Client from "../client/client.ts";

let client: Client;

describe("incidence apis", () => {
  beforeAll(() => {
    client = Client.getInstance({ token: Deno.env.get("CLIENT_TOKEN") });
  });

  describe("cz", () => {
    describe("incidence", () => {
      it("happy - call endpoint with defaults returns data", async () => {
        const [data, err] = await client.incidence.getIncidence714CzV3();

        expect(err).toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(100);
      });

      it("happy - call endpoint with custom value params returns data", async () => {
        const [data, err] = await client.incidence.getIncidence714CzV3({
          page: 10,
          itemsPerPage: 1,
        });

        expect(err).toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
      });

      it("unhappy - call endpoint with page=-1 returns error", async () => {
        const [data, err] = await client.incidence.getIncidence714CzV3({
          page: -1,
        });

        expect(err).toHaveProperty("error");
        expect(err?.error).toHaveProperty("statusCode");
        expect(err?.error).toHaveProperty("statusMessage");
        expect(data).toBeNull();
      });
    });

    describe("incidence of id", () => {
      it("happy - call endpoint with specific id returns data", async () => {
        const [data, err] = await client.incidence.getIncidence714CzV3({
          itemsPerPage: 1,
        });

        expect(err).toBeNull();
        const [_data, error] = await client.incidence.getIncidence714CzOfIdV3({
          // @ts-expect-error this is a test
          id: data[0].id,
        });

        expect(error).toBeNull();
        expect(_data).toHaveProperty("id");
      });
    });
  });

  describe("regions", () => {
    describe("incidence", () => {
      it("happy - call endpoint with defaults returns data", async () => {
        const [data, err] = await client.incidence.getIncidence714RegionV3();

        expect(err).toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(100);
      });

      it("happy - call endpoint with custom params returns data", async () => {
        const [data, err] = await client.incidence.getIncidence714RegionV3({
          page: 10,
          itemsPerPage: 1,
          krajNutsKod: ["CZ020", "CZ080"],
        });

        expect(err).toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
      });
    });

    describe("incidence of id", () => {
      it("happy - call endpoint with id returns data", async () => {
        const [_data, _err] = await client.incidence.getIncidence714RegionV3({
          itemsPerPage: 1,
        });
        const [data, err] = await client.incidence.getIncidence714RegionOfIdV3({
          // @ts-expect-error test
          id: _data[0].id,
        });

        expect(err).toBeNull();
        expect(data).toHaveProperty("id");
      });
    });
  });

  describe("districts", () => {
    describe("incidence", () => {
      it("happy - call endpoint with defaults returns data", async () => {
        const [data, err] = await client.incidence.getIncidence714DistrictV3();

        expect(err).toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(100);
      });

      it("happy - call endpoint with custom params returns data", async () => {
        const [data, err] = await client.incidence.getIncidence714DistrictV3({
          page: 100,
          itemsPerPage: 1,
          okresLauKod: ["CZ0208", "CZ0204"],
        });

        expect(err).toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
      });
    });

    describe("incidence by id", () => {
      it("happy - call endpoint of specific id returns data", async () => {
        const [_data] = await client.incidence.getIncidence714DistrictV3({
          itemsPerPage: 1,
        });
        const [data, err] = await client.incidence
          // @ts-expect-error test
          .getIncidence714DistrictOfIdV3({ id: _data[0].id });

        expect(err).toBeNull();
        expect(data).toHaveProperty("id");
      });
    });
  });
});
