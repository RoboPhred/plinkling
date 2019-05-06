import * as React from "react";

import Ball from "../Ball";

import { Vector2 } from "@/math";

export interface RenderBouncer {
  id: string;
  p1: Vector2;
  p2: Vector2;
}

export interface BouncerFieldProps {
  bouncers: RenderBouncer[];
}

const BouncerField: React.FC<BouncerFieldProps> = ({ bouncers }) => (
  <g>
    {bouncers.map(({ id, p1, p2 }) => (
      <line key={id} x1={p1.x} x2={p2.x} y1={p1.y} y2={p2.y} stroke="black" />
    ))}
  </g>
);

export default BouncerField;
