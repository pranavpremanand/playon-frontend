import "./AdminLogin.scss";
import { Link, useNavigate } from "react-router-dom";
import { LoginBackgroundImage } from "../../../components/LoginBackgroundImage/LoginBackgroundImage";
import { useForm } from "react-hook-form";
import { useStateValue } from "../../../StateProvider";
import { toast } from "react-hot-toast";
import { useState } from "react";

const AdminLogin = () => {
  const [rememberMe, setRememberMe] = useState(false);
  const {register,handleSubmit,formState: { errors },} = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const navigate = useNavigate();

  const [, dispatch] = useStateValue();

  const handleFormSubmit = async (values) => {

  }

    // set remember me option
    const setRememberMeOption = (e) => {
      if (e.target.checked) {
        return setRememberMe(true);
      }
      setRememberMe(false);
    };
  return (
    <div className="login-container">
      <div className="login-section" data-aos="fade-right">
        <div className="form-container">
          <h1>Admin Login</h1>
          {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing</p> */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                    message: "Enter a valid email",
                  },
                })}
              />
              <small className="error">{errors.email?.message}</small>
            </div>
            <div className="input-box">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="*********"
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!#%*?&]{6,16}$/i,
                    message:
                      "Password should be atleast 6 and maximum 16 characters and must contain uppercase, lowercase, numbers and special characters",
                  },
                })}
              />
              <small className="error">{errors.password?.message}</small>
            </div>
            <div className="forgot-pw-box">
              <div className="remember-me">
                <input type="checkbox" onChange={setRememberMeOption}
                    checked={rememberMe}/>
                <p>Remember me</p>
              </div>
              <span>Forgot Password?</span>
            </div>
            <button className="btn-primary" type="submit">
              log in
            </button>
          </form>
        </div>
      </div>
      <LoginBackgroundImage />
    </div>
  );
};

export default AdminLogin