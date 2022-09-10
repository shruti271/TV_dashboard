import axios from "axios";

export function requestGetIndustryLine() {
  return axios.get("http://192.168.1.16:8003/tvapi/industrial_line/");
}
