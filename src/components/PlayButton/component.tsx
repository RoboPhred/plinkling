import * as React from "react";
import { createStyles, WithStyles } from "@/theme";
import injectSheet from "react-jss";

export interface PlayButtonProps {
  x: number;
  y: number;
  onClick(): void;
}

const styles = createStyles({
  button: {
    cursor: "pointer"
  }
});

type Props = PlayButtonProps & WithStyles<typeof styles>;
const PlayButton: React.FC<Props> = ({ classes, x, y, onClick }) => (
  <svg
    className={classes.button}
    xmlns="http://www.w3.org/2000/svg"
    x={x}
    y={y}
    width="256"
    height="256"
    viewBox="0 0 512 512"
    fill="grey"
    onClick={onClick}
  >
    <circle cx={256} cy={256} r={256} fill="transparent" />
    <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z" />
  </svg>
);

export default injectSheet(styles)(PlayButton);
