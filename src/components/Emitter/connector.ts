import { connect } from "react-redux";

import { pick } from "lodash";

import { AppState } from "@/state";
import { emittersByIdSelector } from "@/services/boing/selectors/emitters";
import { Dispatch } from "redux";
import { moveEmitter } from "@/services/boing/actions/move-emitter";

export interface EmitterInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: EmitterInputProps) {
  const { id } = props;
  const emitter = emittersByIdSelector(state)[id];
  return pick(emitter, "position");
}

function mapDispatchToProps(dispatch: Dispatch, props: EmitterInputProps) {
  return {
    onMove: (x: number, y: number) => dispatch(moveEmitter(props.id, x, y))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
