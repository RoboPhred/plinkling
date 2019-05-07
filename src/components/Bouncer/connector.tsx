import { connect } from "react-redux";
import { pick } from "lodash";

import { AppState } from "@/state";

export interface BouncerInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: BouncerInputProps) {
  const { id } = props;
  const ball = state.services.boing.bouncersById[id];
  return pick(ball, ["p1", "p2", "toneTriggerTimestamp"]);
}

export default connect(mapStateToProps);
