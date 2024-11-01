import ApiCallBuilder from "../builders/api-call-builder.ts";
import type { GetApiError } from "../common/api.ts";

export default class VaccinationFacilities {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }

  public getVaccinationFacilitiesV3 = async ({
    page = 1,
    itemsPerPage = 100,
    properties,
    zarizeniKod,
    zarizeniNazev,
    krajNutsKod,
    krajNazev,
    okresLauKod,
    okresNazev,
    zrizovatelKod,
    zrizovatelNazev,
    provozZahajen,
    praktickyLekar,
    praktickyLekarDeti,
    praktickyLekarDospeli,
  }: {
    page?: number;
    itemsPerPage?: number;
    properties?: string[];
    zarizeniKod?: string | string[];
    zarizeniNazev?: string | string[];
    krajNutsKod?: string | string[];
    krajNazev?: string | string[];
    okresLauKod?: string | string[];
    okresNazev?: string | string[];
    zrizovatelKod?: number | number[];
    zrizovatelNazev?: string | string[];
    provozZahajen?: boolean;
    praktickyLekar?: boolean;
    praktickyLekarDeti?: boolean;
    praktickyLekarDospeli?: boolean;
  } = {}): Promise<
    [VaccinationFacilitiesItemArr, null] | [null, GetApiError]
  > => {
    return await new ApiCallBuilder<VaccinationFacilitiesItemArr>({
      token: this.token,
    }).provideEndpoint(
      "/api/v3/ockovaci-zarizeni",
    ).provideQueryParams([
      { page },
      { itemsPerPage },
      { properties },
      { zarizeniKod },
      { zarizeniNazev },
      { krajNutsKod },
      { krajNazev },
      { okresLauKod },
      { okresNazev },
      { zrizovatelKod },
      { zrizovatelNazev },
      { provozZahajen },
      { praktickyLekar },
      { praktickyLekarDeti },
      { praktickyLekarDospeli },
    ]).build();
  };

  public async getVaccinationFacilitiesOfIdV3(
    { id }: { id: string },
  ): Promise<[VaccinationFacilitiesItem, null] | [null, GetApiError]> {
    return await new ApiCallBuilder<VaccinationFacilitiesItem>({
      token: this.token,
    }).provideEndpoint(
      "/api/v3/ockovaci-zarizeni",
    ).provideId(id).build();
  }
}

export interface VaccinationFacilitiesItem {
  id: string;
  zarizeni_kod: string;
  zarizeni_nazev: string;
  provoz_zahajen: boolean;
  kraj_nuts_kod: string;
  kraj_nazev: string;
  okres_lau_kod: string;
  okres_nazev: string;
  zrizovatel_kod: number;
  zrizovatel_nazev: string;
  provoz_ukoncen: string;
  prakticky_lekar: boolean;
  prakticky_lekar_deti: boolean;

  prakticky_lekar_dospeli: boolean;
}

export type VaccinationFacilitiesItemArr = VaccinationFacilitiesItem[];
