import { FieldType, IFieldOpts } from './interfaces';

export const fieldsMetadataKey = Symbol("cm:mapping:fields");
export const mappingMetadataKey = Symbol("cm:mapping:meta");

export function getOpts(target: Object): IFieldOpts[] {
  const opts = [];
  getProperties(target).forEach((key) => {
    opts.push(getMeta(target, key));
  });
  return opts;
}

export function addProperty(target: Object, propertyKey: string, propertyType: FieldType, cls: new(..._: any) => any = null) {
  const fields = getProperties(target);
  fields.add(propertyKey);
  Reflect.defineMetadata(fieldsMetadataKey, fields, target);

  const opts: IFieldOpts = {
    name: propertyKey,
    type: propertyType,
    cls: cls
  };

  setMeta(target, propertyKey, opts);
}

function getProperties(target: Object): Set<string> {
  return Reflect.getMetadata(fieldsMetadataKey, target) || new Set<string>();
}

function setMeta(target: Object, propertyKey: string, opts: IFieldOpts) {
  Reflect.defineMetadata(mappingMetadataKey, opts, target, propertyKey)
}

function getMeta(target: Object, propertyKey: string): IFieldOpts {
  return Reflect.getMetadata(mappingMetadataKey, target, propertyKey)
}
