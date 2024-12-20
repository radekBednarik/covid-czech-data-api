import Sequential from "./sequential.ts";
export default class Helpers {
  private readonly token: string;

  public readonly sequential: Sequential;

  constructor(token: string) {
    this.token = token;

    this.sequential = new Sequential();
  }
}
