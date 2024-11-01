import type { GetApiError } from "../common/api.ts";

export default class Sequential {
  constructor() {}

  public async callEndpoint<T>(
    handler: (
      { page, itemsPerPage }: { page: number; itemsPerPage?: number },
    ) => Promise<[T, null] | [null, GetApiError]>,
    options: { pages: { start: number; end: number }; itemsPerPage?: number },
  ) {
    const data: Array<[T, null] | [null, GetApiError]> = [];

    for (let page = options.pages.start; page <= options.pages.end; page++) {
      const result = await handler({
        page,
        itemsPerPage: options.itemsPerPage,
      });

      data.push(result);
    }

    return data;
  }
}
