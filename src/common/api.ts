import { queryParamsMap } from "./utils.ts";
export type GetApiReturned = Promise<[any, null] | [null, Error]>;

export async function getApi(
    endpoint: string,
    token: string,
    queryParams?: URLSearchParams,
    options?: RequestInit,
): GetApiReturned {
    let response: Response;
    try {
        const baseUrl = "https://onemocneni-aktualne.mzcr.cz";
        const url = new URL(endpoint, baseUrl);
        queryParams?.forEach((value, key) => {
            url.searchParams.append(key, value);
        });
        url.searchParams.append("apiToken", token);

        response = await fetch(url.href, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        if (response.ok) {
            return [await response.json(), null];
        }

        await response.body?.cancel();
        return [
            null,
            new Error(
                `Func getApi failed with response status code: ${response.status} and response status message: ${response.statusText}`,
            ),
        ];
    } catch (error) {
        return [null, new Error(`Func getApi failed with error:\n${error}`)];
    }
}

export function createQueryParams(args: Record<string, string | number | undefined | string[]>) {
    const queryParams = new URLSearchParams();

    Object.entries(args).forEach((arg) => {
        const [key, value] = arg;
        const _key = queryParamsMap[key];

        if (typeof value !== "undefined") {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    queryParams.append(_key, item.toString());
                });
            } else {
                queryParams.append(_key, value.toString());
            }
        }
    });

    return queryParams;
}
