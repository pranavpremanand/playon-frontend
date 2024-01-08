import { LuLayoutDashboard, LuClipboardList } from "react-icons/lu";
import "./AdminSidebar.scss";
import { IoIosPeople } from "react-icons/io";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { BiSolidShoppingBags } from "react-icons/bi";
import { VscJersey } from "react-icons/vsc";
import { RiLogoutBoxRLine } from "react-icons/ri";

const options = [
  { url: "", icon: LuLayoutDashboard, title: "Dashboard" },
  { url: "/users", icon: IoIosPeople, title: "Users" },
  { url: "/products", icon: VscJersey, title: "Products" },
  { url: "/categories", icon: LuClipboardList, title: "Categories" },
  { url: "/manage-orders", icon: BiSolidShoppingBags, title: "Manage Orders" },
  { icon: RiLogoutBoxRLine, title: "Logout" },
];

export const AdminSidebar = ({ children }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [page, setPage] = useState("/dashboard");

  useEffect(() => {
    const route = pathname.slice(6);
    if (route === "/") {
      return setPage("");
    }
    setPage(route);
  }, [pathname]);

  // do logout
  const doLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    navigate("/admin/login");
  };
  return (
    <div className="dashboard-container">
      <div className="options" data-aos="fade-right">
        {options.map((option, i) => (
          <div
            onClick={() => {
              option.title === "Logout"
                ? doLogout()
                : navigate(`/admin${option.url}`);
            }}
            className={`option ${page === option.url && "active"}`}
            key={i}
          >
            {option.icon && <option.icon className="icon" />}
            {option.title}
          </div>
        ))}
      </div>
      <div className="right-side">{children}</div>
    </div>
  );
};
