import "./HomeNavbar.scss";
import Logo from "../../assets/images/logo.png";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { GrFormClose } from "react-icons/gr";

const menuOptions = [
  { title: "shop", url: "/shop" },
  { title: "about us", url: "/about-us" },
  { title: "contact us", url: "/contact-us" },
  { title: "login", url: "/login" },
];


export const HomeNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="home-navbar-main">
      <div className="logo-and-search">
        <Link to={"/"}>
          <img src={Logo} alt="logo" className="logo-img" />
        </Link>
      </div>
        <div
          className="home-page-menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="top line"></div>
          <div className="mid line"></div>
          <div className="bottom line"></div>
        </div>

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
    </div>
  );
};
