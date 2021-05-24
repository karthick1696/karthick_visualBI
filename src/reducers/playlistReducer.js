import { toast } from "react-toastify";
import * as types from "../actionTypes/playlistActionTypes";
import { setItem } from "../common/utils";

export default function playlistReducer(state = {}, action) {
  const { type } = action;

  switch (type) {
    case types.GET_ALL_ALBUMS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case types.GET_ALL_ALBUMS_SUCCESS:
      setItem("albumList", action.data);

      return {
        ...state,
        loading: false,
      };

    case types.GET_ALL_ALBUMS_FAILURE:
      toast.error("Albums Fetching Failed...", {
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
