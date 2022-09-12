import axios from "axios";

export function requestGetShift() {
  return axios.get(`${process.env.REACT_APP_URL}/tvapi/shifttime/`);
}
