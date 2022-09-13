import { call, put } from "redux-saga/effects";
import { requestGetShift } from "../requests/Shift";
import { loadShiftError, loadShiftSuccess } from "../../ducks/Shift";

export function* handleGetShift() {
  try {
    const response = yield call(requestGetShift);
    console.log("Response:", response);

    if (response.status === 200) {
      console.log(response?.data?.data);
      yield put(loadShiftSuccess(response?.data?.data));
    }
  } catch (error) {
    yield put(loadShiftError(error));
  }
}
