import { fork } from "@redux-saga/core/effects";
import watchSongSaga from "./songSaga";

function* rootSagas() {
  return yield* [fork(watchSongSaga)];
}

export default rootSagas;
