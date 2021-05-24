import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Songs } from "./Songs";
import * as SongsActions from "../../../actions/songActions";

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(SongsActions, dispatch),
});

export default connect(null, mapDispatchToProps)(Songs);
