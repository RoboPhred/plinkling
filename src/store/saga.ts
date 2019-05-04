import { fork } from "redux-saga/effects";

import boingSaga from "@/services/boing/saga";

export default function* rootSaga(): IterableIterator<any> {
  yield fork(boingSaga);
}
