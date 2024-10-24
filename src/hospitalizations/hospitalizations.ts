import { type getApi } from "../common/api.ts";
import { createQueryParams } from "../common/api.ts";
export default class Hospitalizations {
  private readonly token: string;
  private readonly getApi: typeof getApi;

  constructor(getApiFunc: typeof getApi, token: string) {
    this.getApi = getApiFunc;
    this.token = token;
  }

  public async getHospitalizationsV3(
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
  ): Promise<[HospitalizationsDataItemArr, null] | [null, Error]> {
    const queryParams = createQueryParams({
      page,
      itemsPerPage,
      properties,
      datumBefore,
      datumStrictlyBefore,
      datumAfter,
      datumStrictlyAfter,
    });
    const [data, err] = await this.getApi(
      "/api/v3/hospitalizace",
      this.token,
      queryParams,
    );

    if (err) {
      return [data, err];
    }
    return [data as HospitalizationsDataItemArr, null];
  }

  public async getHospitalizationOfId(
    { id }: { id: string },
  ): Promise<[HospitalizationsDataItemArr, null] | [null, Error]> {
    const [data, err] = await this.getApi(
      `/api/v3/hospitalizace/${id}`,
      this.token,
    );

    if (err) {
      return [data, err];
    }

    return [data as HospitalizationsDataItemArr, err];
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
