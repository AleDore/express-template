import * as O from "fp-ts/lib/Option";
import * as E from "fp-ts/lib/Either";
import * as t from "io-ts";
import * as packageJson from "../../package.json";
import { pipe } from "fp-ts/lib/function";

/**
 * Parse the string value of a specified key from the package.json file.
 * If it doesn't exists, returns 'UNKNOWN'
 */
export const getValueFromPackageJson = (
  key: keyof typeof packageJson
): string =>
  pipe(
    packageJson[key],
    t.string.decode,
    E.getOrElse(() => "UNKNOWN")
  );

/**
 * Parse a generic Object for a specific key from the package.json file.
 * If the decode process fails returns none, otherwise some<T> of the required object
 */
export const getObjectFromPackageJson = <T>(
  key: keyof typeof packageJson,
  type: t.Type<T>
): O.Option<T> =>
  pipe(
    packageJson[key],
    type.decode,
    E.fold(() => O.none, O.some)
  );

/**
 * Parse the current API version from the version field into the package.json file.
 * If it doesn't exists, returns 'UNKNOWN'
 */
export const getCurrentPackageVersion = (): string =>
  getValueFromPackageJson("version");
