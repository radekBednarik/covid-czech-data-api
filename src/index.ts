/**
 * Entrypoint module exposing single class for
 * user.
 *
 * @example
 * ```ts
 * import Client from '@bedna/czech-covid-data-api-lib'
 *
 * const client = Client.getInstance({token: '<YOUR API TOKEN>'});
 *
 * const [data, err] = await client.hospitalization.getHospitalizationsV3()
 *
 * if (!err) {
 *   console.log(JSON.stringify(data, null, 2));
 * }
 * ```
 */

import Client from "./client/client.ts";

export default Client;
