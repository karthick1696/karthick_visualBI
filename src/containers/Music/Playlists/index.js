import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { Playlists } from "./Playlists";
import * as PlaylistActions from "../../../actions/playlistActions";
import * as SongActions from "../../../actions/songActions";

const mapStateToProps = (state) => ({
  songs: state.Song.songs || [],
  playlist: state.Playlist.playlist || {
    songs: [],
    name: "",
  },
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ ...PlaylistActions, ...SongActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
