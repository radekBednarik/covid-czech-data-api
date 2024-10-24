# Wrapper for official Czech COVID data API

This library provides abstraction for the official Czech COVID data API. It is
wrapper around the [API](https://onemocneni-aktualne.mzcr.cz/api/v3/docs), which
provides a more user-friendly interface.

## System requirements

- have [Deno](https://docs.deno.com/) installed. This library is tested against
  Deno only.

## Installation

Use JSR offered options to install.

## Usage

```ts
import Client from "@bedna/czech-covid-data-api-lib";

const client = new Client({ token: "<YOUR TOKEN>" });

const [data, err] = await client.basicOverview.getBasicOverviewV3();

if (!err) {
  console.log(JSON.stringify(data, null, 2));
}
```

## Documentation

- library documentation and currently available abstractions are
  [HERE](https://jsr.io/@bedna/czech-covid-data-api-lib@0.1.0)

- official API documentation is
  [HERE](https://onemocneni-aktualne.mzcr.cz/api/v3/docs)
