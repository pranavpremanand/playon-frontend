import axios from "axios";

const client = axios.create({ baseURL: 'http://localhost:5000' });

// user
export const userRequest = ({ ...options }) => {
  const token =
    sessionStorage.getItem("token") || localStorage.getItem("token");
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};

// admin 
export const adminRequest = ({ ...options }) => {
  const token =
    sessionStorage.getItem("adminToken") || localStorage.getItem("adminToken");
  client.defaults.headers.common.Authorization = `Bearer ${token}`;

  const onSuccess = (response) => response;
  const onError = (error) => {
    return error;
  };

  return client(options).then(onSuccess).catch(onError);
};
