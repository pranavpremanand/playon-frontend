import { Navigate } from "react-router-dom";

// user
export const ProtectRoute = ({ children }) => {
  if (sessionStorage.getItem("token")) {
    return children;
  }
  return <Navigate to={"/login"} />;
};

export const PublicRoute = ({ children }) => {
  if (sessionStorage.getItem("token")) {
    return <Navigate to={"/"} />;
  }
  return children;
};

// admin
export const AdminProtectRoute = ({ children }) => {
  if (sessionStorage.getItem("adminToken")) {
    return children;
  }
  return <Navigate to={"/admin/login"} />;
};

export const AdminPublicRoute = ({ children }) => {
  if (sessionStorage.getItem("adminToken")) {
    return <Navigate to={"/admin"} />;
  }
  return children;
};