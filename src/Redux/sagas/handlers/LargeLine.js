import { loadSinglePhraseError, loadSinglePhraseSuccess } from "../../ducks/SinglePhrase";
import { requestGetSinglePhrase } from "../requests/SinglePhrase";
import { call, put } from "redux-saga/effects";
import { loadLargeLineError, loadLargeLineSuccess } from "../../ducks/LargeLine";
import { requestGetLargeLine } from "../requests/LargeLine";


export function* handleGetLargeLine() {
    try {
      const response = yield call(requestGetLargeLine);
      console.log("Response:", response);
  
      if (response.status === 200) {
        console.log("+++",response?.data?.data)
        yield put(loadLargeLineSuccess(response?.data?.data));
      }
    } catch (error) {
      yield put(loadLargeLineError(error));
    }
  }