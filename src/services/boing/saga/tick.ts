import { eventChannel } from "redux-saga";
import { takeEvery, put } from "redux-saga/effects";

import { tick } from "@/services/boing/actions/tick";

export default function* tickSaga() {
  yield takeEvery(interval(10), onTick);
}

function* onTick(elapsedMillis: number) {
  yield put(tick(elapsedMillis));
}

function interval(delayMillis: number) {
  let previous = Date.now();
  return eventChannel(emitter => {
    const iv = setInterval(() => {
      const current = Date.now();
      const elapsed = current - previous;
      emitter(elapsed);
      previous - current;
    }, delayMillis);
    return () => {
      clearInterval(iv);
    };
  });
}
