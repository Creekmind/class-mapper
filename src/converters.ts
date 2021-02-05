export function anyToNumber(num: number | unknown): number {
  if (isNaN(+num)) {
    throw new Error(`Wrong type of '${num}'. Expected Number`);
  }

  return +num;
}

export function anyToString(str: string | unknown): string {
  return str.toString();
}

export function anyToBoolean(value: boolean | unknown): boolean {
  return !!value;
}

export function dateToEpoch(value: Date | unknown): number {
  if (!(value instanceof Date)) {
    throw new Error(`Wrong type of '${value}'. Expected Date`);
  }

  return value.getTime()
}

export function epochToDate(value: number | unknown): Date {
  return new Date(anyToNumber(value));
}



