import { connect } from "react-redux";
import { pick } from "lodash";

import { AppState } from "@/state";

export interface BallInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: BallInputProps) {
  const { id } = props;
  const ball = state.services.boing.ballsById[id];
  return pick(ball, ["toneTriggerTimestamp"]);
}

export default connect(mapStateToProps);
