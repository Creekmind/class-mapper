import "reflect-metadata";
import { addProperty } from './reflect';

export function any() {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'any');
  }
}

export function string() {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'string');
  }
}

export function number() {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'number');
  }
}

export function boolean() {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'boolean');
  }
}

export function date() {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'date');
  }
}

export function object(cls: new(..._: any) => {}) {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'object', cls);
  }
}

export function array(cls: new(..._: any) => {}) {
  return (target: any, propertyKey: string) => {
    addProperty(target, propertyKey, 'array', cls);
  }
}

export function notImport() {
  return (target: any, propertyKey: string) => {
  }
}

export function notExport() {

}
