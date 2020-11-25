import { FieldType, IFieldOpts } from './interfaces';

export const fieldsMetadataKey = Symbol("cm:mapping:fields");
export const mappingMetadataKey = Symbol("cm:mapping:meta");

export function getOpts(target: Object): IFieldOpts[] {
  const opts = [];
  getProperties(target).forEach((key) => {
    const meta = getMeta(target, key);
    if (!meta) {
      return;
    }

    opts.push(meta);
  });
  return opts;
}

export function setPropertyType(target: Object, propertyKey: string, propertyType: FieldType, cls: new(..._: any) => any = null) {
  addProperty(target, propertyKey);

  const opts: IFieldOpts = {
    name: propertyKey,
    type: propertyType,
    cls
  };

  setMeta(target, propertyKey, opts);
}

export function setPropertySkipBoxing(target: Object, propertyKey: string) {
  addProperty(target, propertyKey);

  const opts: IFieldOpts = {
    name: propertyKey,
    skipBoxing: true
  }

  setMeta(target, propertyKey, opts);
}

export function setPropertySkipUnboxing(target: Object, propertyKey: string) {
  addProperty(target, propertyKey);

  const opts: IFieldOpts = {
    name: propertyKey,
    skipUnboxing: true
  }

  setMeta(target, propertyKey, opts);
}

function addProperty(target: Object, propertyKey: string) {
  const fields = getProperties(target);
  if (fields.has(propertyKey)) {
    return;
  }

  fields.add(propertyKey);
  Reflect.defineMetadata(fieldsMetadataKey, fields, target);
}

function getProperties(target: Object): Set<string> {
  return Reflect.getMetadata(fieldsMetadataKey, target) || new Set<string>();
}

export function setMeta(target: Object, propertyKey: string, opts: IFieldOpts) {
  const meta = getMeta(target, propertyKey);
  if (meta != null) {
    Object.assign(opts, meta)
  }
  Reflect.defineMetadata(mappingMetadataKey, opts, target, propertyKey)
}

export function getMeta(target: Object, propertyKey: string): IFieldOpts {
  return Reflect.getMetadata(mappingMetadataKey, target, propertyKey)
}
