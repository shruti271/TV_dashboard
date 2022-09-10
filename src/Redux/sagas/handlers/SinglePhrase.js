import { loadSinglePhraseError, loadSinglePhraseSuccess } from "../../ducks/SinglePhrase";
import { requestGetSinglePhrase } from "../requests/SinglePhrase";
import { call, put } from "redux-saga/effects";


export function* handleGetSinglePhase() {
    try {
      const response = yield call(requestGetSinglePhrase);
      console.log("Response:", response);
  
      if (response.status === 200) {
        console.log("+++",response?.data?.data)
        yield put(loadSinglePhraseSuccess(response?.data?.data));
      }
    } catch (error) {
      yield put(loadSinglePhraseError(error));
    }
  }