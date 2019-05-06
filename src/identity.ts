export interface IdentityObject {
  id: string;
}

export interface IdentityCollection<T extends IdentityObject> {
  [id: string]: T;
}

export function identities(collection: IdentityCollection<any>): string[] {
  return Object.keys(collection);
}
export function values<T extends IdentityObject>(
  collection: IdentityCollection<T>
): T[] {
  return Object.keys(collection).map(id => collection[id]);
}
