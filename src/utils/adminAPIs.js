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

// add category
export const createCategory = (data) => {
  return adminRequest({
    url: `${baseUrl}${apis.addCategory}`,
    method: "post",
    data,
  });
};

// get categories
export const getCategories = () => {
  return axios.get(`${baseUrl}${apis.categories}`);
};

// delete category
export const deleteCategory = (id) => {
  return adminRequest({
    url: `${baseUrl}${apis.deleteCategory}${id}`,
    method: "delete",
  });
};
