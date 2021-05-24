import { fork } from "@redux-saga/core/effects";
import watchPlaylistSaga from "./playlistSaga";
import watchSongSaga from "./songSaga";

function* rootSagas() {
  return yield* [fork(watchPlaylistSaga), fork(watchSongSaga)];
}

export default rootSagas;
