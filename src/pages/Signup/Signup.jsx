import "./Signup.scss";
import { ReactComponent as GoogleIcon } from "../../assets/svgs/google-icon.svg";
import { Link, useNavigate } from "react-router-dom";
import { LoginBackgroundImage } from "../../components/LoginBackgroundImage/LoginBackgroundImage";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { checkEmailAvailability, googleLogin, signup } from "../../apiCall";
import { toast } from "react-hot-toast";
import { useStateValue } from "../../StateProvider";
import { useGoogleLogin } from "@react-oauth/google";

export const Signup = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const [, dispatch] = useStateValue();

  const handleFormSubmit = async (values) => {
    // dispatch({ type: "SET_LOADING", status: true });
    // values = { ...values, user_type: "normal" };
    // try {
    //   const response = await signup(values);
    //   console.log(response);
    //   if (response.data?.access_token) {
    //     dispatch({ type: "SET_LOGIN_STATUS", status: true });
    //     sessionStorage.setItem("token", response.data.access_token);
    //     sessionStorage.setItem("refresh_token", response.data.refresh_token);
    //     sessionStorage.setItem(
    //       "user_details",
    //       JSON.stringify(response.data.value)
    //     );
    //     toast.success(response.data?.status[0]?.Message);
    //     navigate("/");
    //   }
    // } catch (err) {
    //   toast.error("Something went wrong");
    // }
    // dispatch({ type: "SET_LOADING", status: false });
  };

  const emailAvailability = () => {
    // const email = getValues("email");
    // return checkEmailAvailability({
    //   email: email,
    //   phoneNumber: 0,
    //   type: "email",
    // });
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
  return (
    <div className="signup-container">
      <div className="signup-section" data-aos="fade-right">
        <div className="form-container">
          <h1>Welcome!</h1>
          {/* <p>Lorem, ipsum dolor sit amet consectetur adipisicing</p> */}
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="input-box">
              <label htmlFor="name">Full Name</label>
              <input
                type="name"
                name="name"
                placeholder="Enter your name"
                {...register("name", {
                  required: "Full name is required",
                  validate: (value) => {
                    if (value.trim() === "") {
                      return "Full name is required";
                    }
                  },
                })}
              />
              <small className="error">{errors.name?.message}</small>
            </div>
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
                  validate: async () => {
                    try {
                      const response = await emailAvailability();
                      if (
                        response.data.status[0].Message ===
                        "Email Is Already In Use."
                      ) {
                        return "Email is already in use";
                      } else {
                        return;
                      }
                    } catch (err) {}
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
            <div className="remember-me">
              <input type="checkbox" />
              <p>Remember me</p>
            </div>
            <button className="btn-primary" type="submit">
              sign up
            </button>
          </form>
          <button className="google-signup-btn button" onClick={doGoogleLogin}>
            <GoogleIcon className="google-icon" />
            Sign Up with Google
          </button>
          <div className="to-login">
            <span>
              Already have an account?{" "}
              <Link to={"/login"} className="underline-none">
                <span className="link">Log In</span>
              </Link>
            </span>
          </div>
        </div>
      </div>
      <LoginBackgroundImage />
    </div>
  );
};
