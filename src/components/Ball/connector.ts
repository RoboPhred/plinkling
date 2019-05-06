import { connect } from "react-redux";
import { pick } from "lodash-es";

import { AppState } from "@/state";

export interface BallInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: BallInputProps) {
  const { id } = props;
  const ball = state.services.boing.balls[id];
  return pick(ball, ["toneTriggerTimestamp"]);
}

export default connect(mapStateToProps);
