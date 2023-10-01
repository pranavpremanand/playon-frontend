import { Link } from "react-router-dom";
import "./Rental.scss";
import { PiCaretRight } from "react-icons/pi";
import ArtImg1 from "../../assets/arts/art (4).png";
import ArtImg2 from "../../assets/arts/art (7).png";
import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { Modal } from "react-bootstrap";

export const Rental = () => {
  const arts = [ArtImg1];
  const [editOpen, setEditOpen] = useState(false);
  const [showRentalInfo, setShowRentalInfo] = useState(false);
  return (
    <div className="rental-container">
      <div className="routes">
        <Link to={"/"} className="underline-none">
          Home
        </Link>
        <PiCaretRight className="icon" />
        <Link to={"/shop"} className="underline-none">
          Shop
        </Link>
        <PiCaretRight className="icon" />
        <Link to={"/product-info/:productId"} className="underline-none">
          Structural Landscape
        </Link>
        <PiCaretRight className="icon" />
        <Link className="underline-none">Your Rental</Link>
      </div>
      <div className="rental-grid">
        <div className="rental-form-side">
          <h1>Delivery Information</h1>
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
              <button
                onClick={() => setEditOpen(false)}
                className="btn-primary"
              >
                save
              </button>
            </form>
          ) : (
            <div className="rental-delivery-info">
              <h1>Pranav</h1>
              <p className="uppercase">Tirur, 676107 Kerala</p>
              <p>pranav@gmail.com</p>
              <p>+91 6568878454</p>
              <span onClick={() => setEditOpen(true)}>Edit</span>
            </div>
          )}
        </div>
        <div className="rental-summary">
          <h1>
            Your Rental{" "}
            <AiOutlineInfoCircle
              onClick={() => setShowRentalInfo(!showRentalInfo)}
              className="icon"
            />
          </h1>
          <div className="order-details">
            {arts.map((product) => {
              return (
                <div className="item">
                  <div className="details">
                    <img src={product} alt="product-img" />
                    <div className="info">
                      <div className="grid">
                        <div className="">
                          <span>Structural Landscape</span>
                          <p>Gregg Rosen</p>
                        </div>
                        <div>
                          <select name="quantity" id="">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </div>
                        <div>
                          <span className="amt">₹6045/month</span>
                        </div>
                      </div>
                      <div className="remove">Remove</div>
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
            <div className="flex-between">
              <span>Sub Total</span>
              <span>₹1,85,323</span>
            </div>
            <div className="flex-between">
              <span>Shipping</span>
              <span>-----</span>
            </div>
            <div className="flex-between">
              <span>Insurance Policy</span>
              <span>₹6045</span>
            </div>
            <hr />
            <div className="flex-between">
              <div>
                <h4>Total</h4>
              </div>
              <div>
                <h4>₹6045/month</h4>
              </div>
            </div>
            <button className="btn-primary">Pay ₹6045/month</button>
          </div>
        </div>
      </div>
      <RentalInfoModal
        show={showRentalInfo}
        onHide={() => setShowRentalInfo(false)}
      />
    </div>
  );
};

function RentalInfoModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="rental-modal-body">
        <h4>Art Rentals</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p>
        <ul>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quod,
          </li>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quod,
          </li>
          <li>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste quod,
          </li>
        </ul>
        <h4>Have more questions?</h4>
        <span>+91 9547565652</span>
      </Modal.Body>
    </Modal>
  );
}
