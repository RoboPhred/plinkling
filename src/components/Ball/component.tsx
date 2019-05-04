import * as React from "react";

export interface BallProps {
  id: string;
}

const Ball: React.FC<BallProps> = () => <circle r={5} />;

export default Ball;
