import axios from "axios";

export function requestGetLargeLine() {
  return axios.get("http://192.168.1.16:8003/tvapi/largeline/");
}
