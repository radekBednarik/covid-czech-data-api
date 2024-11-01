import ApiCallBuilder from "../builders/api-call-builder.ts";
import type { GetApiError } from "../common/api.ts";

export default class VaccinationPlaces {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public getVaccinationPlacesV3 = async ({
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
    zarizeniKod,
    zarizeniNazev,
    poradiDavky,
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
    zarizeniKod?: string | string[];
    zarizeniNazev?: string | string[];
    poradiDavky?: 1 | 2 | 3 | number[];
  } = {}): Promise<[VaccinationPlacesItemArr, null] | [null, GetApiError]> => {
    return await new ApiCallBuilder<VaccinationPlacesItemArr>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/ockovaci-mista").provideQueryParams([
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
        { zarizeniKod },
        { zarizeniNazev },
        { poradiDavky },
      ]).build();
  };

  public async getVaccinationPlacesOfIdV3(
    { id }: { id: string },
  ): Promise<[VaccinationPlacesItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<VaccinationPlacesItem>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/ockovaci-mista").provideId(id).build();
  }
}

export interface VaccinationPlacesItem {
  id: string;
  datum: string;
  vakcina: string;
  kraj_nuts_kod: string;
  kraj_nazev: string;
  zarizeni_kod: string;
  zarizeni_nazev: string;
  poradi_davky: 1 | 2 | 3;
  vekova_skupina: string;
}

export type VaccinationPlacesItemArr = VaccinationPlacesItem[];
