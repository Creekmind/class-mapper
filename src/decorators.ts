import "reflect-metadata";
import { addProperty } from './reflect';

export const any = () => {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'any');
  }
}

export const string = () => {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'string');
  }
}

export const number = () => {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'number');
  }
}

export const boolean = () => {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'boolean');
  }
}

export const date = () => {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'date');
  }
}

export const object = (cls: new(..._: any) => {}) => {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'object', cls);
  }
}

export const array = (cls: new(..._: any) => {}) => {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'array', cls);
  }
}

// TODO
// export function notImport() {
// }
//
// export function notExport() {
// }
