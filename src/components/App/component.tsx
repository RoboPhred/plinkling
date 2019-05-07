import * as React from "react";
import withSheet from "react-jss";

import { createStyles, WithStyles } from "@/theme";

import Starter from "../Starter";
import Game from "../Game";

const styles = createStyles({
  game: {
    width: "100%",
    height: "100%"
  }
});

type Props = WithStyles<typeof styles>;
const App: React.FC<Props> = ({ classes }) => {
  const [started, setStarted] = React.useState(false);
  const onStarted = React.useCallback(() => {
    setStarted(true);
  }, [setStarted]);
  if (!started) {
    return <Starter onStart={onStarted} />;
  } else {
    return <Game className={classes.game} />;
  }
};

export default withSheet(styles)(App);
