export type FieldType = 'any' | 'number' | 'string' | 'boolean' | 'date' | 'object' | 'array';

export interface IFieldOpts {
  name: string;
  type: FieldType;
  cls?: new(..._: any) => any;
}
