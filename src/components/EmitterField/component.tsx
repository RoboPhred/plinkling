import * as React from "react";

import Emitter from "../Emitter";

export interface RenderEmitter {
  id: string;
}

export interface BouncerFieldProps {
  emitters: RenderEmitter[];
}

const EmitterField: React.FC<BouncerFieldProps> = ({ emitters }) => (
  <g>
    {emitters.map(({ id }) => (
      <Emitter key={id} id={id} />
    ))}
  </g>
);

export default EmitterField;
