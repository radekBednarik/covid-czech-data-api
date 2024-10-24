import { getApi } from "../common/api.ts";
import Hospitalizations from "../hospitalizations/hospitalizations.ts";
import Incidence from "../incidence/incidence.ts";

export default class Client {
  private readonly token: string;
  private readonly getApi: typeof getApi;
  public readonly hospitalization: Hospitalizations;
  public readonly incidence: Incidence;

  constructor({ token }: { token?: string }) {
    this.token = this.addToken(token);
    this.getApi = getApi;

    this.hospitalization = new Hospitalizations(this.getApi, this.token);
    this.incidence = new Incidence(this.getApi, this.token);
  }

  private addToken(token?: string) {
    if (typeof token === "string") {
      return token;
    }

    throw new Error("Provided token must be of the type string.");
  }
}
