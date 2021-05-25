import { toast } from "react-toastify";
import * as types from "../actionTypes/songActionTypes";
import { setItem } from "../common/utils";

export default function songReducer(state = {}, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ALL_SONGS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.GET_ALL_SONGS_SUCCESS:
      setItem("songList", action.data);

      return {
        ...state,
        songs: action.data,
        loading: false,
      };

    case types.GET_ALL_SONGS_FAILURE:
      toast.error("Songs Fetching Failed...", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return {
        ...state,
        loading: false,
      };

    case types.GET_ALL_ALBUMS_REQUEST:
      return state;

    case types.GET_ALL_ALBUMS_SUCCESS:
      return {
        ...state,
        albums: (action.data || []).reduce((acc, currVal) => {
          acc[currVal.id] = currVal.title;

          return acc;
        }, {}),
      };

    case types.GET_ALL_ALBUMS_FAILURE:
      toast.error("Albums Fetching Failed...", {
        position: "top-right",
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: false,
      });

      return state;

    case types.SET_SONGS:
      return {
        ...state,
        songs: payload,
      };

    default:
      return state;
  }
}
