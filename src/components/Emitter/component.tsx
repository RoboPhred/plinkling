import * as React from "react";
import { Vector2 } from "@/math";

export interface EmitterProps {
  position: Vector2;
}

const Emitter: React.FC<EmitterProps> = ({ position }) => (
  <circle fill="grey" r={5} cx={position.x} cy={position.y} />
);

export default Emitter;
