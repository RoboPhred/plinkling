import * as React from "react";

import Starter from "../Starter";
import Game from "../Game";

const App: React.FC = () => {
  const [started, setStarted] = React.useState(false);
  const onStarted = React.useCallback(() => {
    setStarted(true);
  }, [setStarted]);
  if (!started) {
    return <Starter onStart={onStarted} />;
  } else {
    return <Game />;
  }
};

export default App;
