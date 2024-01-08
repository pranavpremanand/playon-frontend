import axios from "axios";
import { apis, baseUrl } from "./constant";

// user signup
export const signup = (data) => {
  return axios.post(`${baseUrl}${apis.signup}`,data);
};