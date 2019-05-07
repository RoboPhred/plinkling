import * as React from "react";

import Bouncer from "../Bouncer";

export interface BouncerFieldProps {
  bouncerIds: string[];
}

const BouncerField: React.FC<BouncerFieldProps> = ({ bouncerIds }) => (
  <g>
    {bouncerIds.map(id => (
      <Bouncer key={id} id={id} />
    ))}
  </g>
);

export default BouncerField;
