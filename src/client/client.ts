import Hospitalizations from "../hospitalizations/hospitalizations.ts";
import Incidence from "../incidence/incidence.ts";
import BasicOverview from "../basic-overview/basic-overview.ts";
import Deaths from "../deaths/deaths.ts";
import VaccinationAggregated from "../vaccination/vaccination-aggregated.ts";
import VaccinationPlaces from "../vaccination/vaccination-places.ts";

/**
 * Represents single entrypoint for calling supported
 * COVID REST APIs.
 *
 * Class is a singleton.
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
  /** @property vaccinationPlaces - represents instance of the VaccinationPlaces class */
  public readonly vaccinationPlaces: VaccinationPlaces;
  /** @property instance - holds the singleton instance of the class */
  private static instance: Client;

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
  private constructor({ token }: { token?: string }) {
    this.token = this.addToken(token);

    this.hospitalization = new Hospitalizations(this.token);
    this.incidence = new Incidence(this.token);
    this.basicOverview = new BasicOverview(this.token);
    this.deaths = new Deaths(this.token);
    this.vaccinationAggregated = new VaccinationAggregated(this.token);
    this.vaccinationPlaces = new VaccinationPlaces(this.token);
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

  public static getInstance({ token }: { token?: string }): Client {
    if (typeof token !== "string") {
      throw new Error("Provided token must be a string type!");
    }
    if (!Client.instance) {
      Client.instance = new Client({ token });
    }
    return Client.instance;
  }
}
