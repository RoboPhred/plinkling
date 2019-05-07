import { connect } from "react-redux";

import { pick } from "lodash";

import { identities } from "@/identity";

import { AppState } from "@/state";

import { bouncersByIdSelector } from "@/services/boing/selectors/bouncers";

function mapStateToProps(state: AppState) {
  const bouncersById = bouncersByIdSelector(state);
  const bouncerIds = identities(bouncersById);

  return {
    bouncerIds
  };
}

export default connect(mapStateToProps);
