import * as types from "../actionTypes/songActionTypes";

export const getAllSongs = (payload = {}) => ({
  type: types.GET_ALL_SONGS_REQUEST,
  payload,
});

export const getAllAlbums = (payload = {}) => ({
  type: types.GET_ALL_ALBUMS_REQUEST,
  payload,
});

export const setSongs = (payload = {}) => ({
  type: types.SET_SONGS,
  payload,
});

const actions = {
  getAllAlbums,
  getAllSongs,
  setSongs,
};

export default actions;
