import axios from "axios";
import { domainName, api } from "./Constants";
import { request } from "./utils/axios-utils";

const token = sessionStorage.getItem("token");

// sign up
export const signup = (data) => {
  return axios.post(`${domainName}${api.signup}`, data);
};

// check whether the email is available or not
export const checkEmailAvailability = (data) => {
  return axios.post(`${domainName}${api.emailAvailability}`, data);
};

// login
export const login = (data) => {
  return axios.post(`${domainName}${api.login}`, data);
};

// get user details
export const fetchUser = () => {
  return request({ url: `${domainName}${api.profile}`, method: "get" });
};

// update user details
export const updateUser = (data) => {
  return request({ url: `${domainName}${api.profile}`, method: "put", data });
};

// update user details
export const updateProfileImg = (data) => {
  return request({
    url: `${domainName}${api.updateProfileImg}`,
    method: "post",
    data,
  });
};

// get all products
export const fetchAllProducts = () => {
  return axios.get(`${domainName}${api.allProducts}`);
};

// get categories
export const categoriesList = () => {
  return axios.get(`${domainName}${api.categories}`);
};

// get recent products
export const fetchRecentProducts = () => {
  return axios.get(`${domainName}${api.recentProducts}`);
};

// get popular products
export const fetchPopularProducts = () => {
  return axios.get(`${domainName}${api.popularProducts}`);
};

// get product info
export const fetchProductInfo = ({ queryKey }) => {
  return axios.get(`${domainName}${api.productInfo}${queryKey[1]}`);
};

// get cart items
export const getCart = () => {
  return request({ url: `${domainName}${api.cart}`, method: "get" });
};

// add item to cart
export const addToCart = (data) => {
  return request({
    url: `${domainName}${api.addToCart}`,
    method: "post",
    data,
  });
};

// add item to cart
export const updateQuantity = (data) => {
  return request({
    url: `${domainName}${api.updateQuantity}`,
    method: "put",
    data,
  });
};

// delete from cart
export const deleteFromCart = (productId) => {
  return request({
    url: `${domainName}${api.deleteFromCart}${productId}`,
    method: "delete",
  });
};

// get user addresses
export const getAddresses = () => {
  return request({ url: `${domainName}${api.getAddresses}`, method: "get" });
};

// add address
export const addAddress = (data) => {
  return request({
    url: `${domainName}${api.addAddress}`,
    method: "post",
    data,
  });
};

// delete address
export const deleteAddress = (addressId) => {
  return request({
    url: `${domainName}${api.deleteAddress}${addressId}`,
    method: "delete",
  });
};

// update address
export const updateAddress = (data) => {
  return request({
    url: `${domainName}${api.updateAddress}`,
    method: "put",
    data,
  });
};

// payment
export const doPayment = (data) => {
  return request({
    url: `${domainName}${api.payment}?ammount=${data}`,
    method: "post",
  });
};

// create order
export const createOrder = (data) => {
  return request({
    url: `${domainName}${api.createOrder}`,
    method: "post",
    data,
  });
};

// get all orders
export const getOrders = () => {
  return request({ url: `${domainName}${api.getOrders}` });
};

// cancel order
export const cancelOrder = (data) => {
  return request({
    url: `${domainName}${api.cancelOrder}`,
    method: "post",
    data,
  });
};

// return order
export const returnOrder = (data) => {
  return request({
    url: `${domainName}${api.returnOrder}`,
    method: "post",
    data,
  });
};

// get favorouites
export const getFavorites = () => {
  return request({ url: `${domainName}${api.getFavorites}` });
};

// add to favorites
export const addToFavorites = (productId) => {
  return request({
    url: `${domainName}${api.addFavorite}${productId}`,
    method: "post",
  });
};

// remove from favorites
export const removeFromFavorites = (productId) => {
  return request({
    url: `${domainName}${api.removeFavorite}${productId}`,
    method: "delete",
  });
};

// verify google token
export const googleLogin = (googleToken) => {
  return axios.post(`${domainName}${api.verifyGoogleToken}`, {
    access_token: googleToken,
  });
};

// get notification details
export const getNotificationDetails = () => {
  return request({ url: `${domainName}${api.notifications}` });
};

// change notification status
export const changeNotificationStatus = (data) => {
  return request({
    url: `${domainName}${api.notifications}`,
    method: "post",
    data,
  });
};

// get all reviews
export const getReviews = (productId) => {
  console.log(productId, "productId");
  return axios.get(`${domainName}${api.getReviews}${productId}`);
};

// add review
export const addReview = (data) => {
  return request({
    url: `${domainName}${api.addReview}`,
    method: "post",
    data,
  });
};

// edit review
export const editReview = (data) => {
  return request({
    url: `${domainName}${api.editReview}`,
    method: "put",
    data,
  });
};

// contact us
export const contact = (data) => {
  return axios.post(`${domainName}${api.contactUs}`, data);
};
