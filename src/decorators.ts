import "reflect-metadata";
import { setPropertySkipBoxing, setPropertySkipUnboxing, setPropertyType } from './reflect';

export const any = () => {
  return (target: any, propertyKey: string) => {
    setPropertyType(target, propertyKey, 'any');
  }
}

export const string = () => {
  return (target: any, propertyKey: string) => {
    setPropertyType(target, propertyKey, 'string');
  }
}

export const number = () => {
  return (target: any, propertyKey: string) => {
    setPropertyType(target, propertyKey, 'number');
  }
}

export const boolean = () => {
  return (target: any, propertyKey: string) => {
    setPropertyType(target, propertyKey, 'boolean');
  }
}

export const epoch = () => {
  return (target: any, propertyKey: string) => {
    setPropertyType(target, propertyKey, 'epoch');
  }
}

export const object = (cls: new(..._: any) => {}) => {
  return (target: any, propertyKey: string) => {
    setPropertyType(target, propertyKey, 'object', cls);
  }
}

export const array = (cls: new(..._: any) => {}) => {
  return (target: any, propertyKey: string) => {
    setPropertyType(target, propertyKey, 'array', cls);
  }
}

export function skipBoxing() {
  return (target: any, propertyKey: string) => {
    setPropertySkipBoxing(target, propertyKey)
  }
}

export function skipUnboxing() {
  return (target: any, propertyKey: string) => {
    setPropertySkipUnboxing(target, propertyKey)
  }
}
