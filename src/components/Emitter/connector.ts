import { connect } from "react-redux";

import { pick } from "lodash";

import { AppState } from "@/state";
import { emittersByIdSelector } from "@/services/boing/selectors/emitters";

export interface EmitterInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: EmitterInputProps) {
  const { id } = props;
  const emitter = emittersByIdSelector(state)[id];
  return pick(emitter, "position");
}

export default connect(mapStateToProps);
