import { all, fork, takeLatest } from "redux-saga/effects";
// import { LINE_START } from "../ducks/Line";
import { SHIFT_START } from "../ducks/Shift";
// import { handleGetLine } from "./handlers/Line";
import { handleGetShift } from "./handlers/Shift";

function* onLoadShift() {
  yield takeLatest(SHIFT_START, handleGetShift);
}
// function* onLoadLine() {
//   yield takeLatest(LINE_START, handleGetLine);
// }

const ShiftSagas = [fork(onLoadShift)];
// const LineSagas = [fork(onLoadLine)];

export default function* watcherSaga() {
  yield all([...ShiftSagas]);
  // yield all([...LineSagas]);
}
