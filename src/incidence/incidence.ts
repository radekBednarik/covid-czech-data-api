import { type getApi } from "../common/api.ts";
import { createQueryParams } from "../common/api.ts";
export default class Incidence {
    private readonly token: string;
    private readonly getApi: typeof getApi;

    constructor(getApiFunc: typeof getApi, token: string) {
        this.getApi = getApiFunc;
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
    } = {}): Promise<[IncidenceDataItemArr, null] | [null, Error]> {
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
            "/api/v3/incidence-7-14-cr",
            this.token,
            queryParams,
        );

        if (err) {
            return [data, err];
        }

        return [data as IncidenceDataItemArr, null];
    }

    public async getIncidence714CzOfIdV3({
        id,
    }: {
        id: string;
    }): Promise<[IncidenceDataItem, null] | [null, Error]> {
        const [data, err] = await this.getApi(
            `/api/v3/incidence-7-14-cr/${id}`,
            this.token,
        );

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
    } = {}) {
        const queryParams = createQueryParams({
            page,
            itemsPerPage,
            properties,
            datumBefore,
            datumStrictlyBefore,
            datumAfter,
            datumStrictlyAfter,
            krajNutsKod,
            krajNazev,
        });

        const [data, err] = await this.getApi(
            "/api/v3/incidence-7-14-kraje",
            this.token,
            queryParams,
        );

        if (err) {
            return [data, err];
        }

        return [data as IncidenceDataItemArr, null];
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
