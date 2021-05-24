import { put, all, takeLatest } from "redux-saga/effects";

import * as types from "../actionTypes/playlistActionTypes";
import { getAllAlbumsApi } from "../api/playlistApi";

function* getAllAlbums(action) {
  try {
    const response = yield getAllAlbumsApi(action);
    console.log(response);
    if (!response) {
      yield put({
        type: types.GET_ALL_ALBUMS_FAILURE,
        error: "Albums Fetching Failed...",
      });
    } else {
      yield put({
        type: types.GET_ALL_ALBUMS_SUCCESS,
        data: response,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_ALL_ALBUMS_FAILURE,
      error,
    });
  }
}

export default function* watchSaga() {
  yield all([takeLatest(types.GET_ALL_ALBUMS_REQUEST, getAllAlbums)]);
}
