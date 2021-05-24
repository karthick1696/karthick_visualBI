import { put, all, takeLatest } from "redux-saga/effects";

import * as types from "../actionTypes/songActionTypes";
import { getAllSongsApi } from "../api/songApi";

function* getAllSongs(action) {
  try {
    const { callback } = action.payload;
    const response = yield getAllSongsApi(action);
    if (!response) {
      yield put({
        type: types.GET_ALL_SONGS_FAILURE,
      });
    } else {
      const data = response.slice(0, 100);
      callback && callback(data);
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

export default function* watchSaga() {
  yield all([takeLatest(types.GET_ALL_SONGS_REQUEST, getAllSongs)]);
}
