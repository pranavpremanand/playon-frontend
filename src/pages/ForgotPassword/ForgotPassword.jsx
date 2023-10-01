import "./ForgotPassword.scss";
import { ReactComponent as GoogleIcon } from "../../assets/svgs/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { LoginBackgroundImage } from "../../components/LoginBackgroundImage/LoginBackgroundImage";
import { MdOutlineMail } from "react-icons/md";
import { HiOutlinePhone } from "react-icons/hi";

export const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="forgot-pw-container">
      <div className="main-section">
        <div className="form-container">
          <h1>Forgot Password?</h1>
          <p>
            We sent you a code. select which contact details we use to reset
            your password
          </p>
          <form>
            <div className="input-box">
              <MdOutlineMail className="icon" />
              <input type="email" name="email" placeholder="fdg" />
            </div>
            <div className="input-box">
              <HiOutlinePhone className="icon" />
              <input type="tel" name="phone" placeholder="dfgfdfgdfg" />
            </div>

            <button className="button" onClick={() => navigate("/")}>
              Continue
            </button>
          </form>
        </div>
      </div>
      <LoginBackgroundImage />
    </div>
  );
};
