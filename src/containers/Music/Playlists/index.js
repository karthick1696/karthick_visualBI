import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Playlists } from "./Playlists";
import * as PlaylistActions from "../../../actions/playlistActions";

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(PlaylistActions, dispatch),
});

export default connect(null, mapDispatchToProps)(Playlists);
