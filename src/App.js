import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import { Signup } from "./pages/Signup/Signup";
import { Navbar } from "./components/Navbar/Navbar";
import { Login } from "./pages/Login/Login";
import { Home } from "./pages/Home/Home";
import { Footer } from "./components/Footer/Footer";
import { Shop } from "./pages/Shop/Shop";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { useEffect } from "react";
import { ProfileOptions } from "./components/ProfileOptions/ProfileOptions";
import { Checkout } from "./pages/Checkout/Checkout";
import { useStateValue } from "./StateProvider";
import { Rental } from "./pages/Rental/Rental";
import { Settings } from "./pages/Settings/Settings";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { BuildCustomArt } from "./pages/BuildCustomArt/BuildCustomArt";
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
      onClick={() =>
        showProfileOptions &&
        dispatch({ type: "PROFILE_OPTIONS_VIEW", status: false })
      }
    >
      <GoogleOAuthProvider clientId={googleClientId}>
        <BrowserRouter>
          <Toaster position="top-center" reverseOrder={false} />
          {showProfileOptions && <ProfileOptions />}
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
                  <Navbar />
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
          </Routes>
        </BrowserRouter>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
