import * as React from "react";

import { Vector2 } from "@/math";

export interface BallProps {
  position: Vector2;
}

const Ball: React.FC<BallProps> = ({ position }) => {
  return <circle r={3} cx={position.x} cy={position.y} />;
};

export default Ball;
