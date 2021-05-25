import * as types from "../actionTypes/playlistActionTypes";

export default function playlistReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.SET_PLAYLIST:
      return {
        ...state,
        playlist: payload,
      };

    default:
      return state;
  }
}
