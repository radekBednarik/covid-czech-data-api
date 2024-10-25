import { beforeAll, describe, it } from "@std/testing/bdd";
import Client from "../client/client.ts";
import "@std/dotenv/load";
import { expect } from "@std/expect/expect";

let client: Client;

describe("basic overview", () => {
  beforeAll(() => {
    client = new Client({
      token: Deno.env.get("CLIENT_TOKEN"),
    });
  });

  describe("data without date query param", () => {
    it("happy - call endpoint with defaults returns data", async () => {
      const [data, err] = await client.basicOverview.getBasicOverviewV3();

      expect(err).toBeNull();
      expect(data).toBeInstanceOf(Array);
      expect(data).toHaveLength(1);
    });
  });

  describe("data with date query param", () => {
    it("happy - call endpoint with date subpath returns data", async () => {
      const [data, err] = await client.basicOverview
        .getBasicOverviewOfDayV3({
          date: new Intl.DateTimeFormat("en-CA", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(new Date().setHours(new Date().getHours() - 24)),
        });

      expect(err).toBeNull();
      expect(data).toHaveProperty("datum");
    });
  });
});
