import { connect } from "react-redux";

import { pick } from "lodash-es";

import { identities } from "@/identity";

import { AppState } from "@/state";

import { ballsByIdSelector } from "@/services/boing/selectors/balls";

function mapStateToProps(state: AppState) {
  const ballsById = ballsByIdSelector(state);
  const ballIds = identities(ballsById);
  const balls = ballIds
    .map(id => ballsById[id])
    .map(ball => pick(ball, ["id", "position", "velocity"]));

  return {
    balls
  };
}

export default connect(mapStateToProps);
