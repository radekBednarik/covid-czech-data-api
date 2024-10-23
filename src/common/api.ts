export type GetApiReturned = Promise<[any, null] | [null, Error]>;

export async function getApi(
    endpoint: string,
    token: string,
    queryParams: URLSearchParams,
    options?: RequestInit,
): GetApiReturned {
    let response: Response;
    try {
        const baseUrl = "https://onemocneni-aktualne.mzcr.cz";
        const url = new URL(endpoint, baseUrl);
        queryParams.forEach((value, key) => {
            url.searchParams.append(key, value);
        });
        url.searchParams.append("apiToken", token);

        const encodedUrl = encodeURI(url.href);

        response = await fetch(encodedUrl, {
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
