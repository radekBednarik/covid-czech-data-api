import { beforeAll, describe, it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import Client from "../client/client.ts";
import "@std/dotenv/load";

let client: Client;
describe("/api/v3/hospitalizace", () => {
    beforeAll(() => {
        client = new Client({
            token: Deno.env.get("CLIENT_TOKEN"),
        });
    });

    it("happy - calling endpoint with defaults returns data", async () => {
        const [data, err] = await client.hospitalization.getHospitalizationsV3();

        expect(err).toBeNull();
        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(100);
    });
});
