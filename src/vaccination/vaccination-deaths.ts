import ApiCallBuilder from "../builders/api-call-builder.ts";
import type { GetApiError } from "../common/api.ts";

export default class VaccinationDeaths {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public getVaccinationDeathsV3 = async ({
    page = 1,
    itemsPerPage = 100,
    properties,
    datumBefore,
    datumStrictlyBefore,
    datumAfter,
    datumStrictlyAfter,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
    datumBefore?: string;
    datumStrictlyBefore?: string;
    datumAfter?: string;
    datumStrictlyAfter?: string;
  } = {}): Promise<[VaccinationDeathsItemArr, null] | [null, GetApiError]> => {
    return await new ApiCallBuilder<VaccinationDeathsItemArr>({
      token: this.token,
    }).provideEndpoint("/api/v3/ockovani-umrti").provideQueryParams([
      { page },
      { itemsPerPage },
      { properties },
      { datumBefore },
      { datumStrictlyBefore },
      { datumAfter },
      { datumStrictlyAfter },
    ]).build();
  };

  public async getVaccinationDeathsOfIdV3(
    { id }: { id: string },
  ): Promise<[VaccinationDeathsItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<VaccinationDeathsItem>({
      token: this.token,
    }).provideEndpoint("/api/v3/ockovani-umrti").provideId(id).build();
  }
}

export interface VaccinationDeathsItem {
  id: string;
  datum: string;
  zemreli_celkem: number;
  zemreli_bez_ockovani: number;
  zemreli_bez_ockovani_relativni_pocet: number;
  zemreli_bez_ockovani_vek_prumer: number;
  zemreli_nedokoncene_ockovani: number;
  zemreli_nedokoncene_ockovani_relativni_pocet: number;
  zemreli_nedokoncene_ockovani_vek_prumer: number;
  zemreli_dokoncene_ockovani: number;
  zemreli_dokoncene_ockovani_relativni_pocet: number;
  zemreli_dokoncene_ockovani_vek_prumer: number;
  zemreli_posilujici_davka: number;
  zemreli_posilujici_davka_relativni_pocet: number;
  zemreli_posilujici_davka_vek_prumer: number;
}

export type VaccinationDeathsItemArr = VaccinationDeathsItem[];
