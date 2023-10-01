import { useState } from "react";
import "./Shipping.scss";

export const Shipping = () => {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <div className="main-div">
      <div className="form-side">
        {editOpen ? (
          <form>
            <div className="inputs">
              <div className="input-box">
                <label htmlFor="">Name</label>
                <input type="text" />
              </div>
              <div className="input-box">
                <label htmlFor="">Mobile Number</label>
                <input type="tel" />
              </div>
              <div className="input-box">
                <label htmlFor="">Email</label>
                <input type="email" />
              </div>
              <div className="input-box">
                <label htmlFor="">City</label>
                <input type="text" />
              </div>
              <div className="input-box">
                <label htmlFor="">State</label>
                <input type="text" />
              </div>
              <div className="input-box">
                <label htmlFor="">Zip</label>
                <input type="tel" />
              </div>
              <div className="input-box">
                <label htmlFor="">Address</label>
                <input type="text" />
              </div>
            </div>
            <button onClick={() => setEditOpen(false)} className="btn-primary">
              save
            </button>
          </form>
        ) : (
          <div className="delivery-info">
            <h1>Pranav</h1>
            <p className="uppercase">Tirur, 676107 Kerala</p>
            <p>pranav@gmail.com</p>
            <p>+91 6568878454</p>
            <span onClick={() => setEditOpen(true)}>Edit</span>
          </div>
        )}
      </div>
    </div>
  );
};
