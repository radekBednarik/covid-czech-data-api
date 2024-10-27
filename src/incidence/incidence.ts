import { type GetApiError } from "../common/api.ts";
import ApiCallBuilder from "../builders/api-call-builder.ts";
export default class Incidence {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public async getIncidence714CzV3({
    page = 1,
    itemsPerPage = 100,
    properties,
    datumBefore,
    datumAfter,
    datumStrictlyBefore,
    datumStrictlyAfter,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
    datumBefore?: string;
    datumAfter?: string;
    datumStrictlyBefore?: string;
    datumStrictlyAfter?: string;
  } = {}): Promise<[IncidenceDataItemArr, null] | [null, GetApiError]> {
    const [data, err] = await new ApiCallBuilder({ token: this.token })
      .provideEndpoint("/api/v3/incidence-7-14-cr").provideQueryParams([
        { page },
        { itemsPerPage },
        { properties },
        { datumBefore },
        { datumStrictlyBefore },
        { datumAfter },
        { datumStrictlyAfter },
      ]).build();

    if (err) {
      return [data, err];
    }

    return [data as IncidenceDataItemArr, null];
  }

  public async getIncidence714CzOfIdV3({
    id,
  }: {
    id: string;
  }): Promise<[IncidenceDataItem, null] | [null, GetApiError]> {
    const [data, err] = await new ApiCallBuilder({ token: this.token })
      .provideEndpoint("/api/v3/incidence-7-14-cr").provideId(id).build();

    if (err) {
      return [data, err];
    }

    return [data as IncidenceDataItem, null];
  }

  public async getIncidence714RegionV3({
    page = 1,
    itemsPerPage = 100,
    properties,
    datumBefore,
    datumStrictlyBefore,
    datumAfter,
    datumStrictlyAfter,
    krajNutsKod,
    krajNazev,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
    datumBefore?: string;
    datumStrictlyBefore?: string;
    datumAfter?: string;
    datumStrictlyAfter?: string;
    krajNutsKod?: string | string[];
    krajNazev?: string | string[];
  } = {}): Promise<[IncidenceDataItemArr, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<IncidenceDataItemArr>({ token: this.token })
      .provideEndpoint("/api/v3/incidence-7-14-kraje").provideQueryParams([
        { page },
        { itemsPerPage },
        { properties },
        { datumBefore },
        { datumStrictlyBefore },
        { datumAfter },
        { datumStrictlyAfter },
        { krajNutsKod },
        { krajNazev },
      ]).build();
  }

  public async getIncidence714RegionOfIdV3(
    { id }: { id: string },
  ): Promise<[IncidenceDataItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<IncidenceDataItem>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/incidence-7-14-kraje").provideId(id).build();
  }

  public async getIncidence714DistrictV3({
    page = 1,
    itemsPerPage = 100,
    properties,
    datumBefore,
    datumStrictlyBefore,
    datumAfter,
    datumStrictlyAfter,
    okresLauKod,
    okresNazev,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
    datumBefore?: string;
    datumStrictlyBefore?: string;
    datumAfter?: string;
    datumStrictlyAfter?: string;
    okresLauKod?: string | string[];
    okresNazev?: string | string[];
  } = {}): Promise<[IncidenceDataItemArr, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<IncidenceDataItemArr>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/incidence-7-14-okresy").provideQueryParams([
        { page },
        { itemsPerPage },
        { properties },
        { datumBefore },
        { datumStrictlyBefore },
        { datumAfter },
        { datumStrictlyAfter },
        { okresLauKod },
        { okresNazev },
      ]).build();
  }

  public async getIncidence714DistrictOfIdV3(
    { id }: { id: string },
  ): Promise<[IncidenceDataItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<IncidenceDataItem>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/incidence-7-14-okresy").provideId(id).build();
  }
}

export interface IncidenceDataItem {
  id: string;
  datum: string;
  incidence_7: number;
  incidence_14: number;
  incidence_7_100000: number;
  incidence_14_100000: number;
}

export type IncidenceDataItemArr = IncidenceDataItem[];
