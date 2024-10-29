# Wrapper for official Czech COVID data API

This library provides abstraction for the official Czech COVID data API. It is
wrapper around the [API](https://onemocneni-aktualne.mzcr.cz/api/v3/docs), which
provides a more user-friendly interface.

## System requirements

- have [Deno](https://docs.deno.com/) installed. This library is primarily
  tested against Deno.

- this library also supports [Node.js](https://nodejs.org/) as well, but only as
  best effort.

- have a valid token for the API. You can get it by registering at the
  [API registration page](https://onemocneni-aktualne.mzcr.cz/vytvorit-ucet).

## Installation

Use JSR offered options to install.

## Example of usage

```ts
import Client from "@bedna/czech-covid-data-api-lib";

// Client is a singleton
const client = Client.getInstance({ token: "<YOUR TOKEN>" });

const [data, err] = await client.basicOverview.getBasicOverviewV3();

if (!err) {
  console.log(JSON.stringify(data, null, 2));
}
```

## Documentation

- official API documentation is
  [HERE](https://onemocneni-aktualne.mzcr.cz/api/v3/docs)
