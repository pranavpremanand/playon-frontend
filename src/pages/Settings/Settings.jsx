import { useNavigate, useParams } from "react-router";
import "./Settings.scss";
import { useEffect, useState } from "react";
import OrderDetails from "./components/OrderDetails/OrderDetails";
import artImg1 from "../../assets/arts/art (2).png";
import artImg2 from "../../assets/arts/art (3).png";
import artImg3 from "../../assets/arts/art (4).png";
import artImg4 from "../../assets/arts/art (5).png";
import artImg5 from "../../assets/arts/art (7).png";
import { ProductItem } from "../../components/ProductItem/ProductItem";
import { Shipping } from "./components/Shipping/Shipping";

const imagesArr = [
  artImg1,
  artImg2,
  artImg3,
  artImg4,
  artImg5,
  artImg1,
  artImg2,
  artImg3,
  artImg4,
  artImg5,
];

export const Settings = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [currentShow, setCurrentShow] = useState("");

  useEffect(() => {
    setCurrentShow(params.page ? params.page.toString() : "edit-profile");
  }, [params.page]);

  return (
    <div className="main">
      <h1>Settings</h1>
      <div className="pages">
        <div
          onClick={() => {
            navigate("/settings/edit-profile");
            setCurrentShow("edit-profile");
          }}
          className={`${currentShow === "edit-profile" && "active"}`}
        >
          <span>Edit profile</span>
        </div>
        <div
          onClick={() => {
            navigate("/settings/my-orders");
            setCurrentShow("my-orders");
          }}
          className={`${currentShow === "my-orders" && "active"}`}
        >
          <span>My orders</span>
        </div>
        <div
          onClick={() => {
            navigate("/settings/favorites");
            setCurrentShow("favorites");
          }}
          className={`${currentShow === "favorites" && "active"}`}
        >
          <span>Favorites</span>
        </div>
        <div
          onClick={() => {
            navigate("/settings/shipping");
            setCurrentShow("shipping");
          }}
          className={`${currentShow === "shipping" && "active"}`}
        >
          <span>Shipping</span>
        </div>
      </div>
      {currentShow === "edit-profile" && (
        <div className="edit-profile">
          <form action="">
            <div className="input-box">
              <label htmlFor="">Name</label>
              <input type="text" />
            </div>
            <div className="input-box">
              <label htmlFor="">Email</label>
              <input type="email" />
            </div>
            <div className="input-box">
              <label htmlFor="">Password</label>
              <input type="password" />
              <span>Forgot Password ?</span>
            </div>
            <div className="input-box">
              <label htmlFor="">Mobile Number</label>
              <input type="tel" />
            </div>
            <button className="btn-primary">Save</button>
          </form>
        </div>
      )}
      {currentShow === "my-orders" && (
        <div className="my-orders">
          <OrderDetails />
          <OrderDetails />
        </div>
      )}
      {currentShow === "favorites" && (
        <div className="favorites">
          {imagesArr.map((art, i) => {
            return <ProductItem item={art} key={i} />;
          })}
        </div>
      )}
      {currentShow === "shipping" && <Shipping />}
    </div>
  );
};
