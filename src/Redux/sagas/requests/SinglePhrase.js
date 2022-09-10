import axios from "axios";

export function requestGetSinglePhrase() {
    return axios.get("http://192.168.1.16:8003/tvapi/singlephaseline/", {
      withCredentials: true,
    });
  }