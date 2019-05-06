export interface Vector2 {
  x: number;
  y: number;
}

// It might simplify intercept calculations to store the line
//  as a starting point, angle, and length
export interface Line {
  p1: Vector2;
  p2: Vector2;
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

export function intercept(a: Line, b: Line): Vector2 | null {
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
  if (am === Number.POSITIVE_INFINITY) {
    // a is vertical line
    y = bm * a.p1.x + bb;
    x = bm !== 0 ? (y - bb) / bm : b.p1.x;
  } else if (bm === Number.POSITIVE_INFINITY) {
    // b is vertical line
    y = am * b.p1.x + ab;
    x = am !== 0 ? (y - ab) / am : a.p1.x;
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

function pointInRange(p: Vector2, a: Vector2, b: Vector2): boolean {
  const minX = Math.min(a.x, b.x);
  const maxX = Math.max(a.x, b.x);
  const minY = Math.min(a.y, b.y);
  const maxY = Math.max(a.y, b.y);
  return p.x >= minX && p.x <= maxX && p.y >= minY && p.y <= maxY;
}
