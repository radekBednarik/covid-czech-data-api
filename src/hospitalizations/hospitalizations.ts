import { type GetApiError } from "../common/api.ts";
import ApiCallBuilder from "../builders/api-call-builder.ts";
export default class Hospitalizations {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public getHospitalizationsV3 = async (
    {
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
    } = {},
  ): Promise<[HospitalizationsDataItemArr, null] | [null, GetApiError]> => {
    return await new ApiCallBuilder<HospitalizationsDataItemArr>({
      token: this.token,
    })
      .provideEndpoint(
        "/api/v3/hospitalizace",
      ).provideQueryParams(
        [
          { page },
          { itemsPerPage },
          { properties },
          { datumBefore },
          { datumStrictlyBefore },
          { datumAfter },
          { datumStrictlyAfter },
        ],
      ).build();
  };

  public async getHospitalizationOfId(
    { id }: { id: string },
  ): Promise<[HospitalizationsDataItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<HospitalizationsDataItem>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/hospitalizace").provideId(id).build();
  }
}

export interface HospitalizationsDataItem {
  id: string;
  datum: string;
  pacient_prvni_zaznam: number;
  kum_pacient_prvni_zaznam: number;
  pocet_hosp: number;
  stav_bez_priznaku: number;
  stav_lehky: number;
  stav_stredni: number;
  stav_tezky: number;
  jip: number;
  kyslik: number;
  hfno: number;
  upv: number;
  ecmo: number;
  tezky_upv_ecmo: number;
  umrti: number;
  kum_umrti: number;
}

export type HospitalizationsDataItemArr = HospitalizationsDataItem[];
