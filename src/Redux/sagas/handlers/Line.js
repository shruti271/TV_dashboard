import { call, put } from "redux-saga/effects";
import { loadLineError, loadLineSuccess } from "../../ducks/Line";
import {requestGetLine} from '../requests/Line';

export function* handleGetLine() {
  try {
    const response = yield call(requestGetLine);
    console.log("Response:", response);

    if (response.status === 200) {
      console.log("0000000000000000000000",response?.data?.data.shift_targets
      );
      console.log("0000000000000000000000 wip",response?.data?.data.wipTv);
      yield put(loadLineSuccess(response?.data?.data));
    }
  } catch (error) {
    yield put(loadLineError(error));
  }
}
