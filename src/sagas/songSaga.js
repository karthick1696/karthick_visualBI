import { put, all, takeLatest } from "redux-saga/effects";

import * as types from "../actionTypes/songActionTypes";
import { getAllSongsApi, getAllAlbumsApi } from "../api/songApi";

function* getAllSongs(action) {
  try {
    const response = yield getAllSongsApi(action);
    if (!response) {
      yield put({
        type: types.GET_ALL_SONGS_FAILURE,
      });
    } else {
      const data = response.slice(0, 100);
      yield put({
        type: types.GET_ALL_SONGS_SUCCESS,
        data,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_ALL_SONGS_FAILURE,
      error,
    });
  }
}

function* getAllAlbums(action) {
  try {
    const response = yield getAllAlbumsApi(action);
    if (!response) {
      yield put({
        type: types.GET_ALL_ALBUMS_FAILURE,
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
  yield all([
    takeLatest(types.GET_ALL_SONGS_REQUEST, getAllSongs),
    takeLatest(types.GET_ALL_ALBUMS_REQUEST, getAllAlbums),
  ]);
}
