import { queryParamsMap } from "./utils.ts";
export type QueryParams = Array<
  Record<string, string | string[] | number | number[] | boolean | undefined>
>;

export async function getApi<T>(
  endpoint: string,
  token: string,
  queryParams?: URLSearchParams,
  options?: RequestInit,
): Promise<[T, null] | [null, GetApiError]> {
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
      {
        error: {
          statusCode: response.status,
          statusMessage: response.statusText,
          message:
            `Func getApi failed to retrieve data from provided endpoint:\n${url.href}`,
        },
      },
    ];
  } catch (error) {
    return [null, {
      error: {
        message: `Func getApi failed with error:\n${error}`,
      },
    }];
  }
}

export function createQueryParams(args: QueryParams) {
  const queryParams = new URLSearchParams();

  args.forEach((arg) => {
    Object.entries(arg).forEach(([key, value]) => {
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
  });

  return queryParams;
}

export interface GetApiError {
  error: {
    statusCode?: number;
    statusMessage?: string;
    message?: string;
  };
}
