import { connect } from "react-redux";
import { Dispatch } from "redux";
import { pick } from "lodash";

import { Vector2 } from "@/math";

import { AppState } from "@/state";
import { bouncersByIdSelector } from "@/services/boing/selectors/bouncers";
import { moveBouncer } from "@/services/boing/actions/move-bouncer";

export interface BouncerInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: BouncerInputProps) {
  const { id } = props;
  const ball = bouncersByIdSelector(state)[id];
  return pick(ball, ["p1", "p2", "toneTriggerTimestamp"]);
}

function mapDispatchToProps(dispatch: Dispatch, props: BouncerInputProps) {
  const { id } = props;
  return {
    onMove: (p1: Vector2, p2: Vector2) => dispatch(moveBouncer(id, p1, p2))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
