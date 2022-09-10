import { call, put } from "redux-saga/effects";
import { requestGetSmallMeduim } from "../requests/SmallMeduim";
import { loadSmallMeduimError, loadSmallMeduimSuccess } from "../../ducks/SmallMeduim";


export function* handleGetSmallMeduim() {
    try {
      const response = yield call(requestGetSmallMeduim);
      console.log("Response:", response);
  
      if (response.status === 200) {
        console.log("+++ small meduim ",response?.data?.data)
        yield put(loadSmallMeduimSuccess(response?.data?.data));
      }
    } catch (error) {
      yield put(loadSmallMeduimError(error));
    }
  }