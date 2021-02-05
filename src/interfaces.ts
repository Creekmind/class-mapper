export type FieldType = 'any' | 'number' | 'string' | 'boolean' | 'epoch' | 'object' | 'array';

export interface IFieldOpts {
  name: string;
  type?: FieldType;
  cls?: new(..._: any) => any;
  skipBoxing?: boolean;
  skipUnboxing?: boolean;
}
