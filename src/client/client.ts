import Hospitalizations from "../hospitalizations/hospitalizations.ts";
import Incidence from "../incidence/incidence.ts";

export default class Client {
  private readonly token: string;
  public readonly hospitalization: Hospitalizations;
  public readonly incidence: Incidence;

  constructor({ token }: { token?: string }) {
    this.token = this.addToken(token);

    this.hospitalization = new Hospitalizations(this.token);
    this.incidence = new Incidence(this.token);
  }

  private addToken(token?: string) {
    if (typeof token === "string") {
      return token;
    }

    throw new Error("Provided token must be of the type string.");
  }
}
