import axios from "axios";

export const requestLineData=async()=> await axios.get(`${process.env.REACT_APP_URL}/tvapi/linedata/`);