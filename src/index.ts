import { getOpts } from './reflect';

type Raw = any;

export function box<T>(object: T): Raw {
  const raw: Raw = {};

  for (const property of getOpts(object)) {
    raw[property.name] = object[property.name];
  }

  return raw;
}

export function unbox<T>(raw: Raw, factory: new(..._: any) => T): T {
  const result = new factory();

  for (const property of getOpts(result)) {
    const rawValue = raw[property.name];

    if (rawValue == null) {
      result[property.name] = null;
      continue;
    }

    switch (property.type) {
      case 'any':
        continue;
      case 'string':
        result[property.name] = rawValue.toString();
        break;
      case 'number':
        result[property.name] = +rawValue;
        break;
      case 'date':
        result[property.name] = new Date(rawValue);
        break;
      case 'boolean':
        result[property.name] = !!rawValue;
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

