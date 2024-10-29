import { getApi, type GetApiError } from "../common/api.ts";
import { createQueryParams, type QueryParams } from "../common/api.ts";
import { getLogger, type Logger } from "@logtape/logtape";

export default class ApiCallBuilder<T> {
  private readonly token: string;
  private readonly getApi: typeof getApi;
  private endpoint?: string;
  private queryParams?: QueryParams;
  private id?: string;
  private logger: Logger;

  constructor({
    token,
  }: {
    token: string;
  }) {
    this.logger = getLogger(["czech-covid-data-api-lib", "api-call-builder"]);
    this.token = token;
    this.getApi = getApi;
    this.endpoint = undefined;
    this.id = undefined;
    this.queryParams = undefined;
  }

  public provideQueryParams(queryParams: QueryParams) {
    this.queryParams = queryParams;
    this.logger.debug("Provided query parameters.", {
      method: "provideQueryParams",
      data: queryParams,
    });
    return this;
  }

  public provideEndpoint(endpoint: string) {
    this.endpoint = endpoint;
    this.logger.debug("Provided endpoint.", {
      method: "provideEndpoint",
      data: endpoint,
    });
    return this;
  }

  public provideId(id: string) {
    this.id = id;
    this.logger.debug("Provided endpoint subpath id.", {
      method: "provideId",
      data: id,
    });
    return this;
  }

  public async build(): Promise<[T, null] | [null, GetApiError]> {
    let queryParams: URLSearchParams | undefined;

    if (typeof this.endpoint === "undefined") {
      this.logger.error("Endpoint argument is of type undefined.", {
        method: "build",
        data: this.endpoint,
      });
      throw new Error("Property endpoint has to have a defined value!");
    }

    if (typeof this.queryParams !== "undefined") {
      queryParams = createQueryParams(this.queryParams);
    }

    if (typeof this.id !== "undefined") {
      this.endpoint = `${this.endpoint}/${this.id}`;
    }

    this.logger.debug("Attempting to call the api.", {
      method: "build",
      data: { endpoint: this.endpoint, token: "***", queryParams },
    });
    return await this.getApi<T>(
      this.endpoint,
      this.token,
      queryParams,
    );
  }
}
