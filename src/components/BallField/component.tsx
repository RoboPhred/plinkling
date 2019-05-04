import * as React from "react";

import Ball from "../Ball";

import { Vector2 } from "@/math";

export interface RenderBall {
  id: string;
  position: Vector2;
}

export interface BallFieldProps {
  balls: RenderBall[];
}

const BallField: React.FC<BallFieldProps> = ({ balls }) => (
  <g>
    {balls.map(({ position: { x, y }, id }) => (
      <g key={id} transform={`translate(${x}, ${y})`}>
        <Ball id={id} />
      </g>
    ))}
  </g>
);

export default BallField;
