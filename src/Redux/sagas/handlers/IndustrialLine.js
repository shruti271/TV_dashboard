import { call, put } from "redux-saga/effects";
import {
  loadIndustryLineError,
  loadIndustryLineSuccess,
} from "../../ducks/IndustrialLine";
import { requestGetIndustryLine } from "../requests/IndustrialLine";

export function* handleGetIndustryLine() {
    console.log("comeeeeeeeeeeeee")
  try {
    const response = yield call(requestGetIndustryLine);
    console.log("Response:", response);

    if (response.status === 200) {
      console.log("+++", response?.data?.data);
      yield put(loadIndustryLineSuccess(response?.data?.data));
    }
  } catch (error) {
    yield put(loadIndustryLineError(error));
  }
}
