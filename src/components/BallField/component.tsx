import * as React from "react";

import Ball from "../Ball";

export interface BallFieldProps {
  ballIds: string[];
}

const BallField: React.FC<BallFieldProps> = ({ ballIds }) => (
  <g>
    {ballIds.map(id => (
      <Ball id={id} />
    ))}
  </g>
);

export default BallField;
