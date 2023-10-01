export const googleClientId =
  "1033106969051-fak77bk40o0r5vmipov8v0qcdb75r2a0.apps.googleusercontent.com";
// export const domainName = "http://127.0.0.1:8000";
export const domainName = "http://142.93.223.117:7700";
// export const domainName = "https://nandas.onrender.com";

export const api = {
  signup: "/api/signup",
  login: "/api/login",
  emailAvailability: "/api/isEmailAvailable",
  profile: "/api/profile",
  updateProfileImg: "/api/update-profile-img",
  categories: "/api/get-categories-list",
  allProducts: "/api/get-all-products-list",
  recentProducts: "/api/get-recent-products",
  popularProducts: "/api/get-popular-products",
  categoryProducts: "/api/get-category-products/",
  productInfo: "/api/get-product-info/",
  cart: "/api/get-cart",
  addToCart: "/api/add-to-cart",
  updateQuantity: "/api/update-quantity",
  deleteFromCart: "/api/delete-from-cart/",
  getAddresses: "/api/get-addresses",
  addAddress: "/api/add-address",
  deleteAddress: "/api/delete-address/",
  updateAddress: "/api/update-address",
  payment: "/api/payment",
  createOrder: "/api/create-order",
  getOrders: "/api/get-orders",
  cancelOrder: "/api/cancel-order",
  returnOrder: "/api/return-order",
  getFavorites: "/api/get-favourite-list",
  addFavorite: "/api/add-favourite-list/",
  removeFavorite: "/api/remove-from-favourite-list/",
  verifyGoogleToken: "/api/verify/google_access_token",
  notifications: "/api/notification-details",
  getReviews: "/api/get-all-reviews/",
  addReview: "/api/add-review",
  editReview: "/api/edit-review",
  contactUs: "/api/contact-us",
};
