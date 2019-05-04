export interface Vector2 {
  x: number;
  y: number;
}

export function add(a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
}

export function scale(a: Readonly<Vector2>, scaler: number): Vector2 {
  return {
    x: a.x * scaler,
    y: a.y * scaler
  };
}
