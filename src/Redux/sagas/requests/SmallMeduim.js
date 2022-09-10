import axios from "axios";

export function requestGetSmallMeduim() {
  return axios.get("http://192.168.1.16:8003/tvapi/small_medium_line/");
}
