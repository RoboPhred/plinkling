import * as React from "react";

export interface CircularSvgSliderProps {
  cx: number;
  cy: number;
  r: number;
  text: string;
  min: number;
  max: number;
  value: number;
  onChange(value: number): void;
}

const CircularSvgSlider: React.FC<CircularSvgSliderProps> = ({ cx, cy, r }) => {
  return (
    <path
      d={generatePath(cx, cy, r)}
      stroke="green"
      strokeWidth={2}
      fill="none"
    />
  );
};

export default CircularSvgSlider;

function generatePath(cx: number, cy: number, r: number): string {
  const startAngle = -Math.PI * (1 / 3);
  const endAngle = -Math.PI * (2 / 3);
  return [
    "M",
    cx,
    cy,
    "L",
    cx + Math.cos(startAngle) * r,
    cy - Math.sin(startAngle) * r,
    "A",
    r,
    r,
    0,
    1, //large
    0,
    cx + Math.cos(endAngle) * r,
    cy - Math.sin(endAngle) * r,
    "L",
    cx,
    cy
  ].join(" ");
}
