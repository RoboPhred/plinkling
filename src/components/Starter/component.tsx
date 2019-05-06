import * as React from "react";

import { init } from "@/tone";

export interface StarterProps {
  onStart(): void;
}
const Starter: React.FC<StarterProps> = ({ onStart }) => {
  const onClick = React.useCallback(() => {
    init();
    onStart();
  }, []);
  return (
    <div>
      <button onClick={onClick}>Start</button>
    </div>
  );
};

export default Starter;
