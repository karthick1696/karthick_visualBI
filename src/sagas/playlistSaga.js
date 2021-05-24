import { put, all, takeLatest } from "redux-saga/effects";

import * as types from "../actionTypes/playlistActionTypes";
import { getAllAlbumsApi } from "../api/playlistApi";

function* getAllAlbums(action) {
  try {
    const { callback } = action.payload;
    const response = yield getAllAlbumsApi(action);
    if (!response) {
      yield put({
        type: types.GET_ALL_ALBUMS_FAILURE,
      });
    } else {
      const data = response.slice(0, 25);
      callback && callback(data);
      yield put({
        type: types.GET_ALL_ALBUMS_SUCCESS,
        data,
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
