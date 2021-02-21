import { eventChannel } from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";

import { tick } from "@/services/boing/actions/tick";

// Allowing us to calculate the offset causes rounding errors which make
// the balls unpredictable over large constructs
const FIXED_TIME = true;

export default function* tickSaga() {
  yield takeEvery(interval(10), onTick);
}

function* onTick(elapsedMillis: number) {
  yield put(tick(elapsedMillis));
}

function interval(delayMillis: number) {
  let previous = Date.now();
  return eventChannel((emitter) => {
    const iv = setInterval(() => {
      const current = Date.now();
      const elapsed = current - previous;
      emitter(FIXED_TIME ? delayMillis : elapsed);
      previous = current;
    }, delayMillis);
    return () => {
      clearInterval(iv);
    };
  });
}
