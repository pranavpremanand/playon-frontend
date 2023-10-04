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
import { Settings } from "./pages/Settings/Settings";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword";
import { ContactUs } from "./pages/ContactUs/ContactUs";
import { AboutUs } from "./pages/AboutUs/AboutUs";
import { Toaster } from "react-hot-toast";
import { ProtectRoute, PublicRoute } from "./ProtectRoutes";
import AOS from "aos";
import "aos/dist/aos.css";
import { useQuery } from "@tanstack/react-query";
import { fetchUser, getFavorites } from "./apiCall";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleClientId } from "./Constants";
import { LoadingSpinner } from "./components/LoadingSpinner";
import AdminLogin from "./pages/AdminPages/Login/AdminLogin";
import { AdminNavbar } from "./components/AdminNavbar/AdminNavbar";
import AdminDashboard from "./pages/AdminPages/Dashboard/AdminDashboard";
import { AdminSidebar } from "./components/AdminSidebar/AdminSidebar";
import Users from "./pages/AdminPages/Users/Users";
import Products from "./pages/AdminPages/Products/Products";
import Categories from "./pages/AdminPages/Categories/Categories";
import ManageOrders from "./pages/AdminPages/ManageOrders/ManageOrders";
import { Navbar } from "./components/Navbar/Navbar";

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

  // Get user data
  useQuery({
    queryKey: ["user-data"],
    queryFn: fetchUser,
    onSuccess: (data) => {
      // console.log(data.data);
      if (data.data?.user) {
        sessionStorage.setItem("user_details", JSON.stringify(data.data.user));
      }
    },
    onError: (err) => {
      // handle error
    },
  });

  // get list of favorites
  useQuery(["favorites"], getFavorites, {
    onSuccess: (data) => {
      if (data.data?.status[0]?.Error === "False") {
        dispatch({ type: "SET_FAVORITE_LIST", data: data.data.value });
      }
    },
    onError: (err) => console.log(err),
  });
  return (
    <div
    >
      <GoogleOAuthProvider clientId={googleClientId}>
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
                <>
                  <AdminNavbar />
                  <AdminLogin />
                </>
              }
            />
            <Route
              path="/admin"
              element={
                <>
                  <AdminNavbar />
                  <AdminSidebar>
                    <AdminDashboard />
                  </AdminSidebar>
                </>
              }
            />
            <Route
              path="/admin/users"
              element={
                <>
                  <AdminNavbar />
                  <AdminSidebar>
                    <Users />
                  </AdminSidebar>
                </>
              }
            />
            <Route
              path="/admin/products"
              element={
                <>
                  <AdminNavbar />
                  <AdminSidebar>
                    <Products />
                  </AdminSidebar>
                </>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <>
                  <AdminNavbar />
                  <AdminSidebar>
                    <Categories />
                  </AdminSidebar>
                </>
              }
            />
            <Route
              path="/admin/manage-orders"
              element={
                <>
                  <AdminNavbar />
                  <AdminSidebar>
                    <ManageOrders />
                  </AdminSidebar>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
