import { queryParamsMap } from "./utils.ts";
import { getLogger } from "@logtape/logtape";

const logger = getLogger(["@bedna/czech-covid-data-api-lib", "api"]);
export type QueryParams = Array<
  Record<string, string | string[] | number | number[] | undefined>
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

    logger.debug("Attempting to call API endpoint.", {
      method: "getApi",
      data: { url: url.href },
    });

    response = await fetch(url.href, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (response.ok) {
      logger.debug("Response is ok.", {
        method: "getApi",
        data: { code: response.status, message: response.statusText },
      });
      const data = await response.json();
      logger.debug("API returned data.", {
        method: "getApi",
        data: { data, endpoint: url.href },
      });
      return [data, null];
    }

    logger.debug(
      "Response status not ok, cancelling response body read stream.",
    );
    await response.body?.cancel();

    const error = {
      error: {
        statusCode: response.status,
        statusMessage: response.statusText,
        message:
          `Func getApi failed to retrieve data from provided endpoint:\n${url.href}`,
      },
    };

    logger.error("Response status not ok, returning error.", {
      method: "getApi",
      data: { endpoint: url.href, error },
    });

    return [
      null,
      error,
    ];
  } catch (error) {
    logger.error("Function failed with error.", {
      method: "getApi",
      data: { error },
    });

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
