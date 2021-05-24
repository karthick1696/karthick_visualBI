// import { toast } from "react-toastify";
import * as types from "../actionTypes/playlistActionTypes";

export default function playlistReducer(state = {}, action) {
  const { type } = action;

  switch (type) {
    case types.GET_ALL_ALBUMS_REQUEST:
      return {
        ...state,
        loading: true,
        albumList: [],
      };

    case types.GET_ALL_ALBUMS_SUCCESS:
      return {
        ...state,
        loading: false,
        albumList: action.data || [],
      };

    case types.GET_ALL_ALBUMS_FAILURE:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
