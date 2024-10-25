import Hospitalizations from "../hospitalizations/hospitalizations.ts";
import Incidence from "../incidence/incidence.ts";
import BasicOverview from "../basic-overview/basic-overview.ts";
import Deaths from "../deaths/deaths.ts";
import VaccinationAggregated from "../vaccination/vaccination-aggregated.ts";

/**
 * Represents single entrypoint for calling supported
 * COVID REST APIs.
 */
export default class Client {
  /** @property token - your API token */
  private readonly token: string;
  /**@property hospitalization - represents instance of Hospitalizations class */
  public readonly hospitalization: Hospitalizations;
  /**@property incidence - represents instance of Incidence class */
  public readonly incidence: Incidence;
  /**@property basicOverview - represents instance of BasicOverview class */
  public readonly basicOverview: BasicOverview;
  /** @property deaths - represents instance of the Deaths class */
  public readonly deaths: Deaths;
  /** @property vaccinationAggregated - represents instance of the VaccinationAggregated class  */
  public readonly vaccinationAggregated: VaccinationAggregated;

  /**
   * Represents single entrypoint for calling the supported
   * COVID REST APIs.
   *
   * Each type of COVID data has all methods aggregated under specific
   * class. Instance of this class in represented by a specific
   * Client class property.
   *
   * @param param0 - constructor arg object
   * @param param0.token - your personal token
   */
  constructor({ token }: { token?: string }) {
    this.token = this.addToken(token);

    this.hospitalization = new Hospitalizations(this.token);
    this.incidence = new Incidence(this.token);
    this.basicOverview = new BasicOverview(this.token);
    this.deaths = new Deaths(this.token);
    this.vaccinationAggregated = new VaccinationAggregated(this.token);
  }

  /**
   * Checks the provided value type and returns it if valid.
   *
   * @param token API token
   * @returns token
   */
  private addToken(token?: string) {
    if (typeof token === "string") {
      return token;
    }

    throw new Error("Provided token must be of the type string.");
  }
}
