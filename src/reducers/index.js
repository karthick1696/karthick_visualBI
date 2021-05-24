import { combineReducers } from "redux";
import PlaylistReducer from "./playlistReducer";
import SongReducer from "./songReducer";

export default combineReducers({
  Playlist: PlaylistReducer,
  Song: SongReducer,
});
