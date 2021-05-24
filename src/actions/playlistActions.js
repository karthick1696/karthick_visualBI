import * as types from "../actionTypes/playlistActionTypes";

export const getAllAlbums = (payload = {}) => ({
  type: types.GET_ALL_ALBUMS_REQUEST,
  payload,
});

const actions = {
  getAllAlbums,
};

export default actions;
