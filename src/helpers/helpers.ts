import Sequential from "./sequential.ts";
export default class Helpers {
  private readonly token: string;

  public readonly sequentialSameApi: Sequential;

  constructor(token: string) {
    this.token = token;

    this.sequentialSameApi = new Sequential();
  }
}
