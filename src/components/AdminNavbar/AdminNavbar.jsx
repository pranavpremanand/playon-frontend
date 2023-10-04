import "./AdminNavbar.scss";
import Logo from "../../assets/images/logo.png";
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

const menuOptions = [
  { title: "home", url: "/" },
  { title: "shop", url: "/shop" },
  { title: "user login", url: "/login" },
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

export const AdminNavbar = () => {
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
      <div className="logo-and-search">
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="logo-img" />
        </Link>
      </div>
      <div className="options">
        <ul>
          <Link to={"/"} className="underline-none">
            <li>home</li>
          </Link>
          <Link to={"/shop"} className="underline-none">
            <li>shop</li>
          </Link>
          {/* <Link to={"/login"} className="underline-none">
            <li>user login</li>
          </Link> */}
        </ul>
      </div>
    </div>
  );
};
