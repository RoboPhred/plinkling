export interface Vector2 {
  x: number;
  y: number;
}
export function isVector2(val: any): val is Vector2 {
  return typeof val.x === "number" && typeof val.y === "number";
}

// It might simplify intercept calculations to store the line
//  as a starting point, angle, and length
export interface Line {
  p1: Vector2;
  p2: Vector2;
}

export const VEC_ZERO: Readonly<Vector2> = Object.freeze({ x: 0, y: 0 });
export const VEC_X: Readonly<Vector2> = Object.freeze({ x: 1, y: 0 });

export function constrain(x: number, min: number, max: number): number {
  return Math.min(Math.max(x, min), max);
}

export function add(a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 {
  return {
    x: a.x + b.x,
    y: a.y + b.y
  };
}

export function subtract(a: Readonly<Vector2>, b: Readonly<Vector2>): Vector2 {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}

export function scale(a: Readonly<Vector2>, scaler: number): Vector2 {
  return {
    x: a.x * scaler,
    y: a.y * scaler
  };
}

export function length(a: Readonly<Line>): number {
  const x = a.p1.x - a.p2.x;
  const y = a.p1.y - a.p2.y;
  return Math.sqrt(x * x + y * y);
}

export function magnitude(a: Readonly<Vector2>): number {
  return Math.sqrt(a.x * a.x + a.y * a.y);
}

export function dotProduct(a: Readonly<Vector2>, b: Readonly<Vector2>) {
  return a.x * b.x + a.y * b.y;
}

export function determinate(a: Readonly<Vector2>, b: Readonly<Vector2>) {
  return a.x * b.y - a.y * b.x;
}

export function angle(a: Readonly<Vector2>, b: Readonly<Vector2>): number {
  // This method only produces in range of 0 to 180
  // // a.b = |a| * |b| * cos t
  // // cos t = a.b / (|a| * |b|)
  // const la = magnitude(a);
  // const lb = magnitude(b);
  // const dot = dotProduct(a, b);
  // return Math.acos(dot / (la * lb));

  // This method gives full circle angles
  const det = determinate(a, b);
  const dot = dotProduct(a, b);
  return Math.atan2(det, dot);
}

export function vector(angle: number, magnitude: number) {
  return {
    x: magnitude * Math.cos(angle),
    y: magnitude * Math.sin(angle)
  };
}

export function intercept(
  a: Readonly<Line>,
  b: Readonly<Line>
): Vector2 | null {
  // y = mx+b
  // m1*x+b1 = m2*x+b2
  // b1 = m2*x - m1*x + b2
  // b1 - b2 = m2*x - m1*x
  // b1 - b2 = x*(m2 - m1)
  // (b1 - b2) / (m2 - m1) = x

  // y = mx+b
  // y - b = mx
  // (y - b)/m = x

  const am = (a.p2.y - a.p1.y) / (a.p2.x - a.p1.x);
  const ab = a.p1.y - am * a.p1.x;

  const bm = (b.p2.y - b.p1.y) / (b.p2.x - b.p1.x);
  const bb = b.p1.y - bm * b.p1.x;

  if (bm - am === 0) {
    // parallel lines
    return null;
  }

  let x: number, y: number;
  if (!Number.isFinite(am)) {
    // a is vertical line
    y = bm * a.p1.x + bb;
    x = a.p1.x;
  } else if (!Number.isFinite(bm)) {
    // b is vertical line
    y = am * b.p1.x + ab;
    x = b.p1.x;
  } else {
    x = (ab - bb) / (bm - am);
    y = am * x + ab;
  }

  const intercept: Vector2 = {
    x,
    y
  };

  // Check to see if intercept is within the lines
  if (!pointInRange(intercept, a.p1, a.p2)) {
    return null;
  }
  if (!pointInRange(intercept, b.p1, b.p2)) {
    return null;
  }

  return intercept;
}

function pointInRange(
  p: Readonly<Vector2>,
  a: Readonly<Vector2>,
  b: Readonly<Vector2>
): boolean {
  const minX = Math.min(a.x, b.x);
  const maxX = Math.max(a.x, b.x);
  const minY = Math.min(a.y, b.y);
  const maxY = Math.max(a.y, b.y);
  return p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;
}
