import type { GetApiError } from "../common/api.ts";

export default class Sequential {
  constructor() {}

  public async callEndpoint<T>(
    handler: (
      { page, itemsPerPage }: { page?: number; itemsPerPage?: number },
    ) => Promise<[T, null] | [null, GetApiError]>,
    options: {
      pages: { start?: number; end?: number };
      itemsPerPage?: number;
      waitAfterCall?: number;
    },
  ): Promise<Array<[T, null] | [null, GetApiError]>> {
    const data: Array<[T, null] | [null, GetApiError]> = [];

    const startPage = options.pages.start || 1;
    const endPage = options.pages.end || Infinity;

    for (let page = startPage; page <= endPage; page++) {
      const result = await handler({
        page,
        itemsPerPage: options.itemsPerPage,
      });

      if (Array.isArray(result[0]) && result[0].length === 0) {
        break;
      }

      data.push(result);

      if (typeof options.waitAfterCall === "number") {
        await new Promise((resolve) =>
          setTimeout(resolve, options.waitAfterCall)
        );
      }
    }

    return data;
  }
}
