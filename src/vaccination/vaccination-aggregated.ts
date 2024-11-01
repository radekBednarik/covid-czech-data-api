import ApiCallBuilder from "../builders/api-call-builder.ts";
import type { GetApiError } from "../common/api.ts";

export default class VaccinationAggregated {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public getVaccinationV3 = async ({
    page = 1,
    itemsPerPage = 100,
    properties,
    datumBefore,
    datumStrictlyBefore,
    datumAfter,
    datumStrictlyAfter,
    vakcina,
    krajNutsKod,
    krajNazev,
    vekovaSkupina,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
    datumBefore?: string;
    datumStrictlyBefore?: string;
    datumAfter?: string;
    datumStrictlyAfter?: string;
    vakcina?: string | string[];
    krajNutsKod?: string | string[];
    krajNazev?: string | string[];
    vekovaSkupina?: string | string[];
  } = {}): Promise<
    [VaccinationAggregatedItemArr, null] | [null, GetApiError]
  > => {
    return await new ApiCallBuilder<VaccinationAggregatedItemArr>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/ockovani").provideQueryParams([
        { page },
        { itemsPerPage },
        { properties },
        { datumBefore },
        { datumStrictlyBefore },
        { datumAfter },
        { datumStrictlyAfter },
        { vakcina },
        { krajNutsKod },
        { krajNazev },
        { vekovaSkupina },
      ]).build();
  };

  public async getVaccinationOfIdV3(
    { id }: { id: string },
  ): Promise<[VaccinationAggregatedItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<VaccinationAggregatedItem>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/ockovani").provideId(id).build();
  }
}

export interface VaccinationAggregatedItem {
  id: string;
  datum: string;
  vakcina: string;
  kraj_nuts_kod: string;
  kraj_nazev: string;
  vekova_skupina: string;
  prvnich_davek: number;
  druhych_davek: number;
  celkem_davek: number;
}

export type VaccinationAggregatedItemArr = VaccinationAggregatedItem[];
