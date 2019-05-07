import * as React from "react";

import Bouncer from "../Bouncer";

export interface RenderBouncer {
  id: string;
}

export interface BouncerFieldProps {
  bouncers: RenderBouncer[];
}

const BouncerField: React.FC<BouncerFieldProps> = ({ bouncers }) => (
  <g>
    {bouncers.map(({ id }) => (
      <Bouncer key={id} id={id} />
    ))}
  </g>
);

export default BouncerField;
