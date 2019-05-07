import * as React from "react";

import Emitter from "../Emitter";

export interface BouncerFieldProps {
  emitterIds: string[];
}

const EmitterField: React.FC<BouncerFieldProps> = ({ emitterIds }) => (
  <g>
    {emitterIds.map(id => (
      <Emitter key={id} id={id} />
    ))}
  </g>
);

export default EmitterField;
