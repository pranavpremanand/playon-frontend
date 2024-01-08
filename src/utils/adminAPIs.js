import axios from "axios";
import { apis, baseUrl } from "./constant";
import { adminRequest } from "./axios-utils";

// admin login
export const adminLogin = (data) => {
  return axios.post(`${baseUrl}${apis.adminLogin}`, data);
};

// get all users data
export const getUsers = () => {
  return axios.get(`${baseUrl}${apis.getUsers}`);
};

// block or unblock user
export const changeUserStatus = (data) => {
  return adminRequest({
    url: `${baseUrl}${apis.blockOrUnblockUser}`,
    method: "post",
    data,
  });
};
