import { connect } from "react-redux";

import { createBouncer } from "@/services/boing/actions/create-bouncer";

const mapDispatchToProps = {
  onCreateBouncer: createBouncer
};

export default connect(
  null,
  mapDispatchToProps
);
