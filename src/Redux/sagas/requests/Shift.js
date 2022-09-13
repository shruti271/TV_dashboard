import axios from "axios";

export function requestGetShift() {
  return axios.get("http://192.168.1.16:8003/tvapi/shifttime/");
}
