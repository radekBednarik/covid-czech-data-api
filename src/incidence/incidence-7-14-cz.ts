import { type getApi } from "../common/api.ts";
import { createQueryParams } from "../common/api.ts";
export default class Incidence714Cz {
    private readonly token: string;
    private readonly getApi: typeof getApi;

    constructor(getApiFunc: typeof getApi, token: string) {
        this.getApi = getApiFunc;
        this.token = token;
    }

    public async getIncidenceV3({
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
    } = {}) {
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
            "/api/v3/incidence-7-14-cr",
            this.token,
            queryParams,
        );
    }
}
