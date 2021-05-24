import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Music } from "./Music";
import * as PlayListActions from "../../actions/playlistActions";
import * as SongActions from "../../actions/songActions";

const mapStateToProps = (state) => ({
  albumList: state.Playlist.albumList || [],
  songList: state.Song.songList || [],
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...PlayListActions, ...SongActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Music);
