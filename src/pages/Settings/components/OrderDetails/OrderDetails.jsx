import "./OrderDetails.scss";
import { useState } from "react";
import { Collapse } from "react-bootstrap";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import StepProgressbar from "../../../../components/StepProgressbar/StepProgressbar";
import artImg from "../../../../assets/arts/art (5).png";

const OrderDetails = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="details-div">
      <div
        className="summary-details"
        aria-controls="expanded-order-details"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <span>Order ID : 125</span>
        <span>Order Placed : April 5th 2023, 5:00 PM</span>
        <span>Order Amount: ₹1,85,323</span>
        <span>Order delivered: April 6, 3:00 PM by Raju</span>
        {open ? (
          <AiFillCaretUp className="icon" />
        ) : (
          <AiFillCaretDown className="icon" />
        )}
      </div>
      <Collapse in={open}>
        <div className="expanded-order-details">
          <p>Order delivered: April 6, 3:00 PM by Raju</p>
          <StepProgressbar />
          <div className="art-details">
            <img src={artImg} alt="art-image" />
            <div className="details">
              <div className="info">
                <span>Structural Landscape</span>
                <span>Gregg Rosen</span>
                <span>
                  Categories : Art | Weight : 10 kg | Dimensions : 40 × 50 × 70
                  cm
                </span>
                <span>₹1,85,323</span>
              </div>
              <div className="buttons">
                <button className="btn-primary button">Buy it again</button>
                <button className="btn-secondary button">
                  Product Invoice
                </button>
                <button className="btn-secondary button">
                  Write product review
                </button>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default OrderDetails;
