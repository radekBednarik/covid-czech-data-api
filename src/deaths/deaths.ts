import ApiCallBuilder from "../builders/api-call-builder.ts";
import type { GetApiError } from "../common/api.ts";

export default class Deaths {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public getDeathsV3 = async ({
    page = 1,
    itemsPerPage = 100,
    properties,
    datumBefore,
    datumStrictlyBefore,
    datumAfter,
    datumStrictlyAfter,
    vekBetween,
    vekGt,
    vekGte,
    vekLt,
    vekLte,
    pohlavi,
    krajNutsKod,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
    datumBefore?: string;
    datumStrictlyBefore?: string;
    datumAfter?: string;
    datumStrictlyAfter?: string;
    vekBetween?: string;
    vekGt?: string;
    vekGte?: string;
    vekLt?: string;
    vekLte?: string;
    pohlavi?: string | string[];
    krajNutsKod?: string;
  } = {}): Promise<[DeathsItemArr, null] | [null, GetApiError]> => {
    return await new ApiCallBuilder<DeathsItemArr>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/umrti").provideQueryParams([
        { page },
        { itemsPerPage },
        { properties },
        { datumBefore },
        { datumStrictlyBefore },
        { datumAfter },
        { datumStrictlyAfter },
        { vekBetween },
        { vekGt },
        { vekGte },
        { vekLt },
        { vekLte },
        { pohlavi },
        { krajNutsKod },
      ]).build();
  };

  public async getDeathsOfIdV3(
    { id }: { id: string },
  ): Promise<[DeathsItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<DeathsItem>({ token: this.token })
      .provideEndpoint("/api/v3/umrti").provideId(id).build();
  }
}

export interface DeathsItem {
  id: string;
  datum: string;
  vek: number;
  pohlavi: "M" | "Z";
  kraj_nuts_kod: string;
  okres_lau_kod: string;
}

export type DeathsItemArr = DeathsItem[];
