import { connect } from "react-redux";
import { Music } from "./Music";

const mapStateToProps = (state) => ({
    loading: state.Song.loading || state.Playlist.loading
});

export default  connect(mapStateToProps, null)(Music);
