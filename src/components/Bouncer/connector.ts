import { connect } from "react-redux";
import { pick } from "lodash";

import { AppState } from "@/state";
import { bouncersByIdSelector } from "@/services/boing/selectors/bouncers";

export interface BouncerInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: BouncerInputProps) {
  const { id } = props;
  const ball = bouncersByIdSelector(state)[id];
  return pick(ball, ["p1", "p2", "toneTriggerTimestamp"]);
}

export default connect(mapStateToProps);
