import { connect } from "react-redux";

import { pick } from "lodash";

import { identities } from "@/identity";

import { AppState } from "@/state";

import { ballsByIdSelector } from "@/services/boing/selectors/balls";

function mapStateToProps(state: AppState) {
  const ballsById = ballsByIdSelector(state);
  const ballIds = identities(ballsById);

  return {
    ballIds
  };
}

export default connect(mapStateToProps);
