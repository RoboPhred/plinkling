import { connect } from "react-redux";

import { AppState } from "@/state";
import { setGravityDirection } from "@/services/boing/actions/set-gravity";
import { gravityDirectionSelector } from "@/services/boing/selectors/field";

function mapStateToProps(state: AppState) {
  return {
    value: gravityDirectionSelector(state)
  };
}

const mapDispatchToProps = {
  onChange: setGravityDirection
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
