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
      <div className="review-box">
        <p>For the Love of the Beautiful Game.</p>
        {/* <div className="review">
          <p>Pranav</p>
          <div className="rating">
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
            <RiStarSFill />
          </div>
        </div>
        <div className="artist">
          <span>Artist</span>
          <span>Nanda Art</span>
        </div> */}
      </div>
    </div>
  );
};
