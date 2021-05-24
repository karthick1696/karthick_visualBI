import { put, all, takeLatest } from "redux-saga/effects";

import * as types from "../actionTypes/playlistActionTypes";
import { getAllAlbumsApi } from "../api/playlistApi";

function* getAllAlbums(action) {
  try {
    const response = yield getAllAlbumsApi(action);
    const { status, results = {} } = response || {};
    console.log(response);
    //   if (status !== "success") {
    //     yield put({
    //       type: types.GET_ALL_ALBUMS_FAILURE,
    //       error: response,
    //     });
    //   } else {
    //     yield put({
    //       type: types.GET_ALL_ALBUMS_SUCCESS,
    //       data: results,
    //     });
    //   }
  } catch (error) {
    //   yield put({
    //     type: types.GET_ALL_ALBUMS_FAILURE,
    //     error,
    //   });
  }
}

export default function* watchSaga() {
  yield all([takeLatest(types.GET_ALL_ALBUMS_REQUEST, getAllAlbums)]);
}
