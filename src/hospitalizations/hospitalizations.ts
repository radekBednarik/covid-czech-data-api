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
  ) {
    const queryParams = createQueryParams({
      page,
      itemsPerPage,
      properties,
      datumBefore,
      datumStrictlyBefore,
      datumAfter,
      datumStrictlyAfter,
    });
    return await this.getApi(
      "/api/v3/hospitalizace",
      this.token,
      queryParams,
    );
  }
}
