import { connect } from "react-redux";

import { pick } from "lodash";

import { AppState } from "@/state";
import { emittersByIdSelector } from "@/services/boing/selectors/emitters";
import { Dispatch } from "redux";
import { moveEmitter } from "@/services/boing/actions/move-emitter";
import { setEmitterRate } from "@/services/boing/actions/set-emitter-rate";

export interface EmitterInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: EmitterInputProps) {
  const { id } = props;
  const emitter = emittersByIdSelector(state)[id];
  return pick(emitter, ["position", "rate"]);
}

function mapDispatchToProps(dispatch: Dispatch, props: EmitterInputProps) {
  const { id } = props;
  return {
    onMove: (x: number, y: number) => dispatch(moveEmitter(id, x, y)),
    onSetRate: (rate: number) => dispatch(setEmitterRate(id, rate))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
