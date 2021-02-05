import { getOpts } from './reflect';
import { anyToBoolean, dateToEpoch, anyToNumber, anyToString, epochToDate } from './converters';

type Raw = any;

export function box<T>(object: T): Raw {
  const raw: Raw = {};

  for (const property of getOpts(object)) {
    if (property.skipBoxing) {
      continue;
    }

    const value = object[property.name]

    if (value == null) {
      continue;
    }

    switch (property.type) {
      case 'number':
        raw[property.name] = anyToNumber(value)
        break;
      case 'string':
        raw[property.name] = anyToString(value)
        break;
      case 'boolean':
        raw[property.name] = anyToBoolean(value)
        break;
      case 'epoch':
        raw[property.name] = dateToEpoch(value)
        break;
      case 'object':
        raw[property.name] = box(value)
        break;
      case 'array':
        raw[property.name] = []
        for (const element of value) {
          raw[property.name].push(box(element));
        }
        break;
      default:
        raw[property.name] = object[property.name];
    }
  }

  return raw;
}

export function unbox<T>(raw: Raw, factory: new(..._: any) => T): T {
  const result = new factory();

  for (const property of getOpts(result)) {
    if (property.skipUnboxing) {
      continue;
    }

    const rawValue = raw[property.name];

    if (rawValue == null) {
      result[property.name] = null;
      continue;
    }

    switch (property.type) {
      case 'any':
        result[property.name] = rawValue;
        break;
      case 'string':
        result[property.name] = anyToString(rawValue);
        break;
      case 'number':
        result[property.name] = anyToNumber(rawValue);
        break;
      case 'epoch':
        result[property.name] = epochToDate(rawValue);
        break;
      case 'boolean':
        result[property.name] = anyToBoolean(rawValue);
        break;
      case 'object':
        result[property.name] = unbox(rawValue, property.cls);
        break;
      case 'array':
        result[property.name] = [];
        for (const item of rawValue) {
          if (property.cls) {
            result[property.name].push(unbox(item, property.cls));
          } else {
            result[property.name].push(rawValue);
          }
        }
        break;

    }
  }

  return result;
}

