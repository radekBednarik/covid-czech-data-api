import type { GetApiError } from "../common/api.ts";

export default class Helpers {
  private readonly token: string;

  constructor(token: string) {
    this.token = token;
  }
}
