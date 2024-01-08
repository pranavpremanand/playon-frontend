import ImageBg from "../../assets/images/login-bg.jpg";
import { RiStarSFill } from "react-icons/ri";
import "./LoginBackgroundImage.scss";

export const LoginBackgroundImage = () => {
  return (
    <div
      data-aos="fade-left"
      className="image"
      style={{ backgroundImage: `url(${ImageBg})` }}
    >
      {/* <div className="review-box">
        <p>For the Love of the Beautiful Game.</p> */}
      {/* </div> */}
    </div>
  );
};
