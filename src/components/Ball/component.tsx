import * as React from "react";

export interface BallProps {
  toneTriggerTimestamp: number;
}

const Ball: React.FC<BallProps> = ({ toneTriggerTimestamp }) => {
  return <circle r={5} />;
};

export default Ball;
