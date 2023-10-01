import "./Navbar.scss";
import Logo from "../../assets/images/logo.png";
import { HiOutlineSearch } from "react-icons/hi";
import {
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GrFormClose } from "react-icons/gr";
import OffcanvasBgImg from "../../assets/images/become-a-seller-bg.png";
import PlayIcon from "../../assets/images/play-icon.png";
import { PiCaretDownBold } from "react-icons/pi";
import { useStateValue } from "../../StateProvider";
import { LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { FaRegCalendarCheck, FaUserEdit } from "react-icons/fa";
import { LiaHeart } from "react-icons/lia";
import { MdOutlineLocalShipping } from "react-icons/md";
import { fetchAllProducts, fetchUser, getFavorites } from "../../apiCall";
import { domainName } from "../../Constants";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import SearchResultItem from "./components/SearchResultItem";

const menuOptions = [
  { title: "shop", url: "/shop" },
  { title: "about us", url: "/about-us" },
  { title: "contact us", url: "/contact-us" },
  { title: "login", url: "/login" },
  // { title: "become a freelancer", url: "/" },
  // { title: "build custom art", url: "/build-custom-art" },
];

const dashboardOptions = [
  { url: "dashboard", icon: LuLayoutDashboard, title: "Dashboard" },
  { url: "my-orders", icon: FaRegCalendarCheck, title: "My Orders" },
  { url: "favorites", icon: LiaHeart, title: "Favorites" },
  { url: "message", icon: AiOutlineMessage, title: "Message" },
  { url: "settings", icon: LuSettings, title: "Settings" },
  { url: "edit-profile", icon: FaUserEdit, title: "Edit Profile" },
  { url: "shipping", icon: MdOutlineLocalShipping, title: "Shipping" },
  { url: "support-ticket", title: "Support Ticket" },
];

export const Navbar = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [{ showProfileOptions, userLoggedIn }, dispatch] = useStateValue();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDashboardMenu, setShowDashboardMenu] = useState(false);
  const navigate = useNavigate();
  const userDetails = JSON.parse(sessionStorage.getItem("user_details"));
  const userEmail = userDetails?.email.split("@")[0];
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 981);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const customStyles = {
    borderBottom: pathname !== "/" ? "1px solid #c2c2c2" : "",
    backgroundColor: pathname === "/" && "#fffbf6",
    gridTemplateColumns: pathname === "/" ? "1fr 1fr" : undefined,
  };

  // get all products
  // useQuery(
  //   ["products-to-search"],
  //   fetchAllProducts,
  //   {
  //     onSuccess: (data) => {
  //       setProducts(
  //         data.data.value.map((product) => {
  //           const item = {
  //             id: product.id,
  //             name: product.title,
  //             price: product.price,
  //             image: product.main_image,
  //           };
  //           return item;
  //         })
  //       );
  //     },
  //   }
  // );

  // handle select on search result item
  const handleOnSelect = (item) => {
    navigate(`/product-info/${item.id}`);
  };

  return (
    <div className="navbar-main" style={customStyles}>
      {pathname !== "/" && !userLoggedIn ? (
        <div className="buttons sm-view-btns">
          <Link to={"/login"}>
            <button className="btn-secondary button">log in</button>
          </Link>
          <Link to={"/signup"}>
            <button className="btn-primary button">sign up</button>
          </Link>
        </div>
      ) : null}
      <div className="logo-and-search">
        {pathname !== "/" &&
        pathname !== "/dashboard/dashboard" &&
        pathname !== "/dashboard/message" &&
        pathname !== "/dashboard/my-orders" &&
        pathname !== "/dashboard/favorites" &&
        pathname !== "/dashboard/edit-profile" &&
        pathname !== "/dashboard/shipping" &&
        pathname !== "/dashboard/settings" &&
        pathname !== "/dashboard/support-ticket" ? (
          <AiOutlineMenu
            onClick={() => setMenuOpen(!menuOpen)}
            className="menu-icon"
          />
        ) : null}
        {pathname === "/dashboard/dashboard" ||
        pathname === "/dashboard/message" ||
        pathname === "/dashboard/my-orders" ||
        pathname === "/dashboard/favorites" ||
        pathname === "/dashboard/edit-profile" ||
        pathname === "/dashboard/shipping" ||
        pathname === "/dashboard/settings" ||
        pathname === "/dashboard/support-ticket" ? (
          <AiOutlineMenu
            onClick={() => setShowDashboardMenu(!showDashboardMenu)}
            className="menu-icon"
          />
        ) : null}
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="logo-img" />
        </Link>
        {pathname !== "/" && (
          // <>
          //   <div className="search-box">
          //     <input type="text" placeholder="Search" />
          //     <HiOutlineSearch className="icon" />
          //   </div>
          // </>
          <ReactSearchAutocomplete
            items={products}
            // onSearch={handleOnSearch}
            // onHover={handleOnHover}
            onSelect={handleOnSelect}
            // onFocus={handleOnFocus}
            // autoFocus
            formatResult={SearchResultItem}
          />
        )}
        {userLoggedIn && pathname !== "/" ? (
          <>
            <Link to={"/checkout"} className="underline-none">
              <AiOutlineShoppingCart className="sm-cart-icon" />
            </Link>
            <div
              className="profile sm-view-profile"
              onClick={() =>
                dispatch({
                  type: "PROFILE_OPTIONS_VIEW",
                  status: !showProfileOptions,
                })
              }
            >
              <img
                src={
                  userDetails.profile_image
                    ? `${domainName}${userDetails?.profile_image}`
                    : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                }
                alt="profile"
                className="profile-img"
              />
              {/* <span>{userDetails?.name || userEmail}</span> */}
              <PiCaretDownBold className="icon" />
            </div>
          </>
        ) : null}
      </div>
      {pathname !== "/" ? (
        <div className="options">
          <ul>
            <Link to={"/shop"} className="underline-none">
              <li>shop</li>
            </Link>
            {/* <Link className="underline-none">
              <li>club jerseys</li>
            </Link>
            <Link to={"/build-custom-art"} className="underline-none">
              <li>international jerseys</li>
            </Link> */}
            <Link to={"/about-us"} className="underline-none">
              <li>about us</li>
            </Link>
            <Link to={"/contact-us"} className="underline-none">
              <li>contact us</li>
            </Link>
            {userLoggedIn ? (
              <>
                <Link to={"/checkout"} className="underline-none">
                  <li>
                    <AiOutlineShoppingCart className="cart-icon" />
                  </li>
                </Link>
                <li>
                  <div
                    className="profile"
                    onClick={() =>
                      dispatch({
                        type: "PROFILE_OPTIONS_VIEW",
                        status: !showProfileOptions,
                      })
                    }
                  >
                    <img
                      src={
                        userDetails.profile_image
                          ? `${domainName}${userDetails?.profile_image}`
                          : "https://img.freepik.com/free-icon/user_318-159711.jpg"
                      }
                      alt="profile"
                      className="profile-img"
                    />
                    <span>{userDetails?.name || userEmail}</span>
                    <PiCaretDownBold className="icon" />
                  </div>
                </li>
              </>
            ) : (
              <>
                <Link to={"/login"} className="underline-none">
                  <li>log in</li>
                </Link>
                <Link to={"/signup"} className="underline-none">
                  <li>sign up</li>
                </Link>
              </>
            )}
          </ul>
        </div>
      ) : (
        <div
          className="home-page-menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="top line"></div>
          <div className="mid line"></div>
          <div className="bottom line"></div>
        </div>
      )}

      <Offcanvas
        show={menuOpen}
        onHide={() => setMenuOpen(false)}
        placement={"top"}
      >
        <div className="offcanvas-header">
          <img src={Logo} alt="logo" className="logo-img" />
          <GrFormClose className="icon" onClick={() => setMenuOpen(false)} />
        </div>
        <Offcanvas.Body className="offcanvas-body">
          <div className="offcanvas-inner">
            <div className="image">
              {/* <img src={OffcanvasBgImg} alt="" className="main-img" />
              <img src={PlayIcon} alt="" className="play-icon" /> */}
            </div>
            <div className="options">
              <ul>
                {menuOptions.map((option, i) => {
                  return (
                    <Link
                      key={i}
                      to={option.url}
                      className="underline-none"
                      onClick={() => setMenuOpen(false)}
                    >
                      <li>{option.title}</li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={showDashboardMenu}
        onHide={() => setShowDashboardMenu(false)}
        placement={"start"}
      >
        <div className="offcanvas-header-dashboard">
          <GrFormClose
            className="icon"
            onClick={() => setShowDashboardMenu(false)}
          />
        </div>
        <Offcanvas.Body className="dashboard-offcanvas-body">
          <div className="offcanvas-inner">
            <div className="options">
              {dashboardOptions.map((option, i) => (
                <div
                  onClick={() => {
                    navigate(`/dashboard/${option.url}`);
                    setShowDashboardMenu(false);
                  }}
                  className={`option`}
                  key={i}
                >
                  {option.icon && <option.icon className="icon" />}
                  {option.title}
                </div>
              ))}
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};
