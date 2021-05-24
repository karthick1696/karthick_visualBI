import { toast } from "react-toastify";
import * as types from "../actionTypes/songActionTypes";
import { setItem } from "../common/utils";

export default function songReducer(state = {}, action) {
  const { type } = action;

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

    default:
      return state;
  }
}
