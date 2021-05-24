import * as types from "../actionTypes/songActionTypes";

export const getAllSongs = (payload = {}) => ({
  type: types.GET_ALL_SONGS_REQUEST,
  payload,
});

const actions = {
  getAllSongs,
};

export default actions;
