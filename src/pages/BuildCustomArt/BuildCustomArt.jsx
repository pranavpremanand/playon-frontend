import { Link } from "react-router-dom";
import { LoginBackgroundImage } from "../../components/LoginBackgroundImage/LoginBackgroundImage";
import "./BuildCustomArt.scss";
import { useEffect, useState } from "react";

export const BuildCustomArt = () => {
  const [today, setToday] = useState("");

  // Get current date
  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const todayDate = `${year}-${month}-${day}`;
    setToday(todayDate);
  }, []);
  return (
    <div className="page-container">
      <div className="left-section" data-aos="fade-right">
        <div className="form-container">
          <h1>Build Custom Art</h1>
          <form>
            <div className="input-box">
              <label htmlFor="">Give your project brief a title</label>
              <input
                type="text"
                name=""
                placeholder="Write your project brief a title"
              />
            </div>
            <div className="input-box">
              <label htmlFor="">What are you looking to get done?</label>
              <input
                type="text"
                name=""
                placeholder="Write about what are your looking to get done"
              />
            </div>
            <div className="box">
              <label htmlFor="">Attachments</label>
              <div className="file-upload">
                Drag or{" "}
                <span>
                  <u>upload</u>
                </span>{" "}
                project files
              </div>
            </div>
            <div className="box">
              <label htmlFor="">Delivery Date</label>
              <input className="date" type="date" name="date_of_birth" min={today} />
            </div>
            <div className="box">
              <label htmlFor="">Amount</label>
              <div className="input">
                <input type="tel" name="" />
                <span>₹</span>
              </div>
            </div>
            <button className="button">submit</button>
          </form>
        </div>
      </div>
      <LoginBackgroundImage />
    </div>
  );
};
