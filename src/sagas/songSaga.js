import { put, all, takeLatest } from "redux-saga/effects";

import * as types from "../actionTypes/songActionTypes";
import { getAllSongsApi } from "../api/songApi";

function* getAllSongs(action) {
  try {
    const response = yield getAllSongsApi(action);
    console.log(response);
    if (!response) {
      yield put({
        type: types.GET_ALL_SONGS_FAILURE,
        error: "Songs Fetching Failed...",
      });
    } else {
      yield put({
        type: types.GET_ALL_SONGS_SUCCESS,
        data: response,
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_ALL_SONGS_FAILURE,
      error,
    });
  }
}

export default function* watchSaga() {
  yield all([takeLatest(types.GET_ALL_SONGS_REQUEST, getAllSongs)]);
}
