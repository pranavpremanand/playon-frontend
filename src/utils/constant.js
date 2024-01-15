// export const baseUrl = "http://localhost:5000";
export const baseUrl = process.env.REACT_APP_BACKEND_URL;

export const apis = {
  adminLogin: "/api/admin/login",
  signup:'/api/user/signup',
  login:'/api/user/login',
  getUsers:'/api/admin/get-users',
  blockOrUnblockUser:'/api/admin/change-user-status',
  addCategory:'/api/admin/add-category',
  categories:'/api/admin/categories',
  deleteCategory:'/api/admin/delete-category/'
};
