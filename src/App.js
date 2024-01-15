import { lazy } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { Signup } from "./pages/Signup/Signup";
import { HomeNavbar } from "./components/HomeNavbar/HomeNavbar";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { Shop } from "./pages/Shop/Shop";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { useEffect } from "react";
import { useStateValue } from "./StateProvider";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { Toaster } from "react-hot-toast";
import {
  AdminProtectRoute,
  AdminPublicRoute,
  ProtectRoute,
  PublicRoute,
} from "./ProtectRoutes";
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery } from "@tanstack/react-query";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { LoadingSpinner } from "./components/LoadingSpinner";
import AdminLogin from "./pages/AdminPages/Login/AdminLogin";
import { AdminNavbar } from "./components/AdminNavbar/AdminNavbar";
import AdminDashboard from "./pages/AdminPages/Dashboard/AdminDashboard";
import { AdminSidebar } from "./components/AdminSidebar/AdminSidebar";
import Products from "./pages/AdminPages/Products/Products";
import Categories from "./pages/AdminPages/Categories/Categories";
import ManageOrders from "./pages/AdminPages/ManageOrders/ManageOrders";
import { Navbar } from "./components/Navbar/Navbar";
import Users from "./pages/AdminPages/Users/Users";

export const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [{ showProfileOptions, isLoading }, dispatch] = useStateValue();
  AOS.init({
    once: true,
    delay: 150,
    duration: 1000,
    // offset:220
  });

  return (
    <>
      <GoogleOAuthProvider clientId={"googleClientId"}>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          {isLoading && <LoadingSpinner />}
          <ScrollToTop />
          <Routes>
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Navbar />
                  <Signup />
                </PublicRoute>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Navbar />
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <HomeNavbar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/shop"
              element={
                <>
                  <Navbar />
                  <Shop />
                  <Footer />
                </>
              }
            />
            <Route
              path="/product-info/:productId"
              element={
                <>
                  <Navbar />
                  <ProductDetails />
                  <Footer />
                </>
              }
            />
            {/* 
            <Route
              path="/checkout"
              element={
                <>
                  <Navbar />
                  <Checkout />
                  <Footer />
                </>
              }
            />
            <Route
              path="/rental"
              element={
                <>
                  <Navbar />
                  <Rental />
                  <Footer />
                </>
              }
            /> */}
            {/* <Route
            path="/settings/:page"
            element={
              <ProtectRoute>
                <Navbar />
                <Settings />
                <Footer />
              </ProtectRoute>
            }
          /> */}
            {/* <Route
              path="/dashboard/:page"
              element={
                <ProtectRoute>
                  <Navbar />
                  <Dashboard />
                </ProtectRoute>
              }
            />
            <Route
              path="/build-custom-art"
              element={
                <ProtectRoute>
                  <Navbar />
                  <BuildCustomArt />
                </ProtectRoute>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <>
                  <Navbar />
                  <ForgotPassword />
                </>
              }
            />
            <Route
              path="/contact-us"
              element={
                <>
                  <Navbar />
                  <ContactUs />
                  <Footer />
                </>
              }
            />
          */}
            <Route
              path="/about-us"
              element={
                <>
                  <Navbar />
                  <AboutUs />
                  <Footer />
                </>
              }
            />
            <Route
              path="/admin/login"
              element={
                <AdminPublicRoute>
                  <AdminNavbar />
                  <AdminLogin />
                </AdminPublicRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <AdminProtectRoute>
                  <AdminNavbar />
                  <AdminSidebar>
                    <AdminDashboard />
                  </AdminSidebar>
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminProtectRoute>
                  <AdminNavbar />
                  <AdminSidebar>
                    <Users />
                  </AdminSidebar>
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminProtectRoute>
                  <AdminNavbar />
                  <AdminSidebar>
                    <Products />
                  </AdminSidebar>
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminProtectRoute>
                  <AdminNavbar />
                  <AdminSidebar>
                    <Categories />
                  </AdminSidebar>
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/manage-orders"
              element={
                <AdminProtectRoute>
                  <AdminNavbar />
                  <AdminSidebar>
                    <ManageOrders />
                  </AdminSidebar>
                </AdminProtectRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </>
  );
}

export default App;
