import { connect } from "react-redux";

import { reset } from "@/services/boing/actions/reset";

const mapDispatchToProps = {
  onClick: reset
};

export default connect(
  null,
  mapDispatchToProps
);
