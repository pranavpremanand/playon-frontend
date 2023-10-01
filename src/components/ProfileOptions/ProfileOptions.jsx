import { LuLayoutDashboard, LuSettings } from "react-icons/lu";
import { BsHandbag, BsSuitHeart } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { useStateValue } from "../../StateProvider";

export const ProfileOptions = () => {
  const [, dispatch] = useStateValue();
  const navigate = useNavigate();

  // Do user logout
  const doLogout = () => {
    sessionStorage.clear();
    dispatch({ type: "SET_LOGIN_STATUS", status: false });
    navigate("/");
  };
  return (
    <div className="profile-options-bg">
      <div className="profile-options">
        <Link className="underline-none" to={`/dashboard/${"dashboard"}`}>
          <div className="option">
            <LuLayoutDashboard className="icon" />
            Dashboard
          </div>
        </Link>
        <Link className="underline-none" to={`/dashboard/${"my-orders"}`}>
          <div className="option">
            <BsHandbag className="icon" />
            My Orders
          </div>
        </Link>
        <Link className="underline-none" to={`/dashboard/${"favorites"}`}>
          <div className="option">
            <BsSuitHeart className="icon" />
            Favorites
          </div>
        </Link>
        <Link className="underline-none" to={`/dashboard/${"edit-profile"}`}>
          <div className="option">
            <FaRegEdit className="icon" />
            Edit Profile
          </div>
        </Link>
        <Link className="underline-none" to={`/dashboard/${"settings"}`}>
          <div className="option">
            <LuSettings className="icon" />
            Settings
          </div>
        </Link>
        <div className="option" onClick={doLogout}>
          <RiLogoutBoxLine className="icon" />
          Log Out
        </div>
      </div>
    </div>
  );
};
