import ApiCallBuilder from "../builders/api-call-builder.ts";
import type { GetApiError } from "../common/api.ts";

export default class VaccinationDemographic {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public async getVaccinationDemographicDataV3({
    page = 1,
    itemsPerPage = 100,
    properties,
    datumBefore,
    datumStrictlyBefore,
    datumAfter,
    datumStrictlyAfter,
    vakcinaKod,
    poradiDavky,
    pohlavi,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
    datumBefore?: string;
    datumStrictlyBefore?: string;
    datumAfter?: string;
    datumStrictlyAfter?: string;
    vakcinaKod?: string | string[];
    poradiDavky?: 1 | 2 | 3 | (1 | 2 | 3)[];
    pohlavi?: "M" | "Z" | ("M" | "Z")[];
  } = {}): Promise<
    [VaccinationDemographicDataItemArr, null] | [null, GetApiError]
  > {
    return await new ApiCallBuilder<VaccinationDemographicDataItemArr>({
      token: this.token,
    }).provideEndpoint(
      "/api/v3/ockovani-demografie",
    ).provideQueryParams([
      { page },
      { itemsPerPage },
      { properties },
      { datumBefore },
      { datumStrictlyBefore },
      { datumAfter },
      { datumStrictlyAfter },
      { vakcinaKod },
      { poradiDavky },
      { pohlavi },
    ]).build();
  }

  public async getVaccinationDemographicDataOfIdV3(
    { id }: { id: string },
  ): Promise<[VaccinationDemographicDataItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<VaccinationDemographicDataItem>({
      token: this.token,
    }).provideEndpoint("/api/v3/ockovani-demografie").provideId(id).build();
  }
}

export interface VaccinationDemographicDataItem {
  id: string;
  datum: string;
  vakcina: string;
  vakcina_kod: string;

  poradi_davky: 1 | 2 | 3;
  vekova_skupina: string;
  pohlavi: "M" | "Z";
  pocet_davek: number;
}

export type VaccinationDemographicDataItemArr =
  VaccinationDemographicDataItem[];
