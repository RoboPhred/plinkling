import { connect } from "react-redux";
import { Dispatch } from "redux";
import { pick } from "lodash";

import { VEC_X, angle } from "@/math";

import { AppState } from "@/state";
import { emittersByIdSelector } from "@/services/boing/selectors/emitters";
import { moveEmitter } from "@/services/boing/actions/move-emitter";
import { setEmitterRate } from "@/services/boing/actions/set-emitter-rate";
import { setEmitterDirection } from "@/services/boing/actions/set-emitter-velocity";

export interface EmitterInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: EmitterInputProps) {
  const { id } = props;
  const emitter = emittersByIdSelector(state)[id];
  return {
    ...pick(emitter, ["position", "rate"]),
    angle: angle(VEC_X, emitter.velocity)
  };
}

function mapDispatchToProps(dispatch: Dispatch, props: EmitterInputProps) {
  const { id } = props;
  return {
    onMove: (x: number, y: number) => dispatch(moveEmitter(id, x, y)),
    onSetRate: (rate: number) => dispatch(setEmitterRate(id, rate)),
    onSetDirection: (angle: number) => dispatch(setEmitterDirection(id, angle))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
