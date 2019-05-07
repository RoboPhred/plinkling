import { connect } from "react-redux";

import { pick } from "lodash";

import { identities } from "@/identity";

import { AppState } from "@/state";

import { bouncersByIdSelector } from "@/services/boing/selectors/bouncers";

function mapStateToProps(state: AppState) {
  const bouncersById = bouncersByIdSelector(state);
  const bouncerIds = identities(bouncersById);
  const bouncers = bouncerIds
    .map(id => bouncersById[id])
    .map(bouncer => pick(bouncer, ["id"]));

  return {
    bouncers
  };
}

export default connect(mapStateToProps);
