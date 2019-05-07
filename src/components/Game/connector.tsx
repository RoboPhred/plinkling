import { connect } from "react-redux";

import { createBouncer } from "@/services/boing/actions/create-bouncer";
import { setSize } from "@/services/boing/actions/set-size";

const mapDispatchToProps = {
  onCreateBouncer: createBouncer,
  onResize: setSize
};

export default connect(
  null,
  mapDispatchToProps
);
