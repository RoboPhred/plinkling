import * as React from "react";

import BallField from "../BallField";
import BouncerField from "../BouncerField";

const Game: React.FC = () => (
  <div>
    <svg width="1000" height="1000" viewBox="-500 0 1000 1000">
      <BallField />
      <BouncerField />
    </svg>
  </div>
);
export default Game;
