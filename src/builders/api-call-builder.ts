import { getApi } from "../common/api.ts";
import { createQueryParams, type QueryParams } from "../common/api.ts";

export default class ApiCallBuilder {
  private readonly token: string;
  private readonly getApi: typeof getApi;
  private endpoint: string;
  private queryParams?: QueryParams;
  private id?: string;

  constructor({
    token,
  }: {
    token: string;
  }) {
    this.token = token;
    this.getApi = getApi;
    this.endpoint = "";
    this.id = undefined;
    this.queryParams = undefined;
  }

  public provideQueryParams(queryParams: QueryParams) {
    this.queryParams = queryParams;
    return this;
  }

  public provideEndpoint(endpoint: string) {
    this.endpoint = endpoint;
    return this;
  }

  public provideId(id: string) {
    this.id = id;
    return this;
  }

  public async build() {
    let queryParams: URLSearchParams | undefined;

    if (typeof this.queryParams !== "undefined") {
      queryParams = createQueryParams(this.queryParams);
    }

    if (typeof this.endpoint === "undefined") {
      throw new Error("Property endpoint has to have a defined value!");
    }

    if (typeof this.id !== "undefined") {
      this.endpoint = `${this.endpoint}/${this.id}`;
    }

    return await this.getApi(
      this.endpoint,
      this.token,
      queryParams,
    );
  }
}
