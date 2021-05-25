import * as types from "../actionTypes/playlistActionTypes";

export const setPlaylist = (payload = {}) => ({
  type: types.SET_PLAYLIST,
  payload,
});

const actions = {
  setPlaylist,
};

export default actions;
