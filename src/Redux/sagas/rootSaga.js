import { all, fork, takeLatest } from "redux-saga/effects";
import { SHIFT_START } from "../ducks/Shift";
import { handleGetShift } from "./handlers/Shift";

function* onLoadShift() {
  yield takeLatest(SHIFT_START, handleGetShift);
}
const ShiftSagas = [fork(onLoadShift)];

export default function* watcherSaga() {
  yield all([...ShiftSagas]);
}
