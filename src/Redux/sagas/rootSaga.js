import { all, fork, takeLatest } from "redux-saga/effects";
import { INDUSTRY_LINE_START } from "../ducks/IndustrialLine";
import { LARGE_LINE_START } from "../ducks/LargeLine";
import { SINGLE_PHRASE_START } from "../ducks/SinglePhrase";
import { SMALL_MEDUIM_START } from "../ducks/SmallMeduim";
import { handleGetIndustryLine } from "./handlers/IndustrialLine";
import { handleGetLargeLine } from "./handlers/LargeLine";
import { handleGetSinglePhase } from "./handlers/SinglePhrase";
import { handleGetSmallMeduim } from "./handlers/SmallMeduim";

function* onLoadSinglePhase() {
  yield takeLatest(SINGLE_PHRASE_START, handleGetSinglePhase);
}
function* onLoadSmallMeduim() {
  yield takeLatest(SMALL_MEDUIM_START, handleGetSmallMeduim);
}
function* onLoadLargeLine() {
    yield takeLatest(LARGE_LINE_START,handleGetLargeLine );
  }
  function* onLoadIndustryLine() {
    yield takeLatest(INDUSTRY_LINE_START,handleGetIndustryLine );
  }
const singlePhaseSagas = [fork(onLoadSinglePhase)];
const smallMeduimSagas = [fork(onLoadSmallMeduim)];
const LargeLineSagas = [fork(onLoadLargeLine)];
const IndustryLineSagas = [fork(onLoadIndustryLine)];

export default function* watcherSaga() {
  yield all([...singlePhaseSagas, ...smallMeduimSagas,...LargeLineSagas,...IndustryLineSagas]);
}
