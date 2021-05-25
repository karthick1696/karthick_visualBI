import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Songs } from "./Songs";
import * as SongsActions from "../../../actions/songActions";

const mapStateToProps = (state) => ({
  songs: state.Song.songs || [],
  albums: state.Song.albums || {},
  playlist: state.Playlist.playlist || {},
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(SongsActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Songs);
