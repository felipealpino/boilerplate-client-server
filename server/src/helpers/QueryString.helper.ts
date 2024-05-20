/**
 *  Como usar:
 *
 *  #FRONTEND
 *  const encoded = QueryStringHelper.encode(object, true);
 *
 *  #BACKEND
 *	const decoded = QueryStringHelper.decode(object);
 */

import { GenericObject } from '@/types';

type NonEncodedObject = GenericObject<any>;
type EncodedObject = GenericObject<string>;
type BuiltQueryString = string;
type EncodeReturn<T> = T extends true ? BuiltQueryString : EncodedObject;

export const QueryStringHelper = {
  encode<T extends boolean | undefined>(payload: NonEncodedObject, buildQueryString: T) {
    let encodedObject = {};

    Object.entries(payload).forEach(([key, value]) => {
      if (typeof value === 'object') {
        encodedObject = { ...encodedObject, [key]: encodeURIComponent(JSON.stringify(value)) };
      } else if (typeof value === 'undefined' || typeof value === 'function' || typeof value === 'symbol') {
        // esses tipos serão ignorados.
      } else {
        encodedObject = { ...encodedObject, [key]: value };
      }
    });

    if (!buildQueryString) return encodedObject as EncodeReturn<T>;
    return objectToQueryString(encodedObject) as EncodeReturn<T>;
  },

  decode<T extends EncodedObject | BuiltQueryString>(payload: T) {
    let encodedObject: EncodedObject;

    if (typeof payload === 'string') {
      encodedObject = parseQueryString(payload);
    } else {
      encodedObject = payload;
    }

    let decodedObject = {} as EncodedObject;

    Object.entries(encodedObject).forEach(([key, value]) => {
      try {
        decodedObject = { ...decodedObject, [key]: JSON.parse(decodeURIComponent(value)) };
      } catch (e) {
        decodedObject = { ...decodedObject, [key]: value };
      }
    });

    return decodedObject as NonEncodedObject;
  },
};

function objectToQueryString(encodedObject: EncodedObject) {
  const queryString: string[] = [];

  Object.entries(encodedObject).forEach(([key, value]) => {
    queryString.push(`${key}=${value}`);
  });

  return queryString.join('&') as BuiltQueryString;
}

function parseQueryString(queryString: BuiltQueryString) {
  let encodedObject = new Object();

  queryString.split('&').forEach((v) => {
    const [key, value] = v.split('=');
    encodedObject = { ...encodedObject, [key]: value };
  });

  return encodedObject as EncodedObject;
}
