// import { toast } from "react-toastify";
import * as types from "../actionTypes/songActionTypes";

export default function songReducer(state = {}, action) {
  const { type } = action;

  switch (type) {
    case types.GET_ALL_SONGS_REQUEST:
      return {
        ...state,
        loading: true,
        songList: [],
      };

    case types.GET_ALL_SONGS_SUCCESS:
      return {
        ...state,
        loading: false,
        songList: action.data || [],
      };

    case types.GET_ALL_SONGS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
