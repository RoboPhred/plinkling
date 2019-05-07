import { connect } from "react-redux";
import { pick } from "lodash";

import { AppState } from "@/state";
import { ballsByIdSelector } from "@/services/boing/selectors/balls";

export interface BallInputProps {
  id: string;
}

function mapStateToProps(state: AppState, props: BallInputProps) {
  const { id } = props;
  const ball = ballsByIdSelector(state)[id];
  return pick(ball, ["position"]);
}

export default connect(mapStateToProps);
