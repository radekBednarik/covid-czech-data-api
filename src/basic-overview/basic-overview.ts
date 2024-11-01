import ApiCallBuilder from "../builders/api-call-builder.ts";
import type { GetApiError } from "../common/api.ts";

export default class BasicOverview {
  /**@property token - API token */
  private readonly token: string;

  /**
   * Represents all methods for getting data of `zakladni-prehled`
   * section of the available APIs.
   *
   * @link https://onemocneni-aktualne.mzcr.cz/api/v3/docs
   * @param token API token
   */
  constructor(token: string) {
    this.token = token;
  }

  /**
   * Handles call to `/api/v3/zakladni-prehled`
   * @param param0
   * @param param0.page
   * @param param0.itemsPerPage
   * @param param0.properties
   */
  public getBasicOverviewV3 = async ({
    page = 1,
    itemsPerPage = 100,
    properties,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
  } = {}): Promise<[BasicOverviewItemArr, null] | [null, GetApiError]> => {
    return await new ApiCallBuilder<BasicOverviewItemArr>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/zakladni-prehled").provideQueryParams([
        { page },
        { itemsPerPage },
        { properties },
      ]).build();
  };

  /**
   * Handles call to `/api/v3/zakladni-prehled/:date`.
   *
   * @param param0
   * @param param0.date - date in expected format of `YYYY-MM-DD`
   * @returns
   */
  public async getBasicOverviewOfDayV3(
    { date }: { date: string },
  ): Promise<[BasicOverviewItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<BasicOverviewItem>({
      token: this.token,
    })
      .provideEndpoint("/api/v3/zakladni-prehled").provideId(date)
      .build();
  }
}

export interface BasicOverviewItem {
  datum: string;
  provedene_testy_celkem: number;
  potvrzene_pripady_celkem: number;
  aktivni_pripady: number;
  vyleceni: number;
  umrti: number;
  aktualne_hospitalizovani: number;
  provedene_testy_vcerejsi_den: number;
  potvrzene_pripady_vcerejsi_den: number;
  provedene_testy_vcerejsi_den_datum: string;
  potvrzene_pripady_vcerejsi_den_datum: string;
  provedene_antigenni_testy_celkem: number;
  provedene_antigenni_testy_vcerejsi_den: number;
  provedene_antigenni_testy_vcerejsi_den_datum: string;
  vykazana_ockovani_celkem: number;
  vykazana_ockovani_vcerejsi_den: number;
  vykazana_ockovani_vcerejsi_den_datum: string;
  potvrzene_pripady_65_celkem: number;
  potvrzene_pripady_65_vcerejsi_den: number;
  potvrzene_pripady_65_vcerejsi_den_datum: string;
  ockovane_osoby_celkem: number;
  ockovane_osoby_vcerejsi_den: number;
  ockovane_osoby_vcerejsi_den_datum: string;
  reinfekce_celkem: number;
  reinfekce_vcerejsi_den: number;
  reinfekce_vcerejsi_den_datum: string;
}

export type BasicOverviewItemArr = BasicOverviewItem[];
