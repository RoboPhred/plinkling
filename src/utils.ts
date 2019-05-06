export function isNotNull<T>(val: T | null | undefined): val is T {
  return val != null;
}

export function mapOrRemove<T extends object, TResult>(
  object: T,
  mapper: (value: T[keyof T]) => TResult | null
): { [P in keyof T]: TResult } {
  const keys = Object.keys(object);
  const result: any = {};
  for (const key of keys) {
    const value = mapper((object as any)[key]);
    if (value) {
      result[key] = value;
    }
  }
  return result;
}
