import "./Login.scss";
import { ReactComponent as GoogleIcon } from "../../assets/svgs/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { LoginBackgroundImage } from "../../components/LoginBackgroundImage/LoginBackgroundImage";
import { useForm } from "react-hook-form";
import { useStateValue } from "../../StateProvider";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";

export const Login = () => {
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
    // dispatch({ type: "SET_LOADING", status: true });
    // try {
    //   const response = await login(values);
    //   if (response.data?.access_token) {
    //     dispatch({ type: "SET_LOGIN_STATUS", status: true });
    //     if (rememberMe) {
    //       localStorage.setItem("token", response.data.access_token);
    //     } else {
    //       sessionStorage.setItem("token", response.data.access_token);
    //     }
    //     // sessionStorage.setItem("refresh_token", response.data.refresh_token);
    //     sessionStorage.setItem(
    //       "user_details",
    //       JSON.stringify(response.data.value)
    //     );
    //     navigate("/");
    //   } else {
    //     toast.error(response.data?.status[0]?.Message);
    //   }
    // } catch (err) {
    //   console.log(err,'login error')
    //   // toast.error("Something went wrong");
    //   toast.error(err.message);
    // }
    // dispatch({ type: "SET_LOADING", status: false });
  };

  // google login
  const doGoogleLogin = useGoogleLogin({
    // onSuccess: (tokenResponse) => {
    //   console.log(tokenResponse, "token response");
    //   verifyUser(tokenResponse);
    // },
    // onError: (error) => console.log("error", error),
  });

  // const verifyUser = async (data) => {
  //   dispatch({ type: "SET_LOADING", status: true });
  //   try {
  //     const response = await googleLogin(data.access_token);
  //     if (response.data?.access_token) {
  //       dispatch({ type: "SET_LOGIN_STATUS", status: true });
  //       sessionStorage.setItem("token", response.data.access_token);
  //       sessionStorage.setItem("refresh_token", response.data.refresh_token);
  //       sessionStorage.setItem(
  //         "user_details",
  //         JSON.stringify(response.data.value)
  //       );
  //       navigate("/");
  //     } else {
  //       toast.error(response.data?.status[0]?.Message);
  //     }
  //   } catch (err) {
  //     console.log(err, "error response");
  //     toast.error("Something went wrong");
  //   }
  //   dispatch({ type: "SET_LOADING", status: false });
  // };

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
          <h1>Welcome back!</h1>
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
          <button className="google-login-btn button" onClick={doGoogleLogin}>
            <GoogleIcon className="google-icon" />
            Log In with Google
          </button>
          <div className="to-signup">
            <span>
              Already have an account?{" "}
              <Link to={"/signup"} className="underline-none">
                <span className="link">Sign Up</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <LoginBackgroundImage />
    </div>
  );
};
