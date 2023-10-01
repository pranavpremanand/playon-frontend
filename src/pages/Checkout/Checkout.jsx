import { Link } from "react-router-dom";
import "./Checkout.scss";
import { PiCaretRight } from "react-icons/pi";
import { BiShield } from "react-icons/bi";
import OrderSuccessImg from "../../assets/images/green-bg-success.png";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { domainName } from "../../Constants";
import { doPayment, getAddresses, getCart } from "../../apiCall";
import { CartItem } from "./components/CartItem/CartItem";
import { useStateValue } from "../../StateProvider";
import { Shipping } from "../Dashboard/components/Shipping/Shipping";
import { displayRazorpay } from "./components/Razorpay";
import { toast } from "react-hot-toast";
import EmptyCart from "../../assets/images/empty-cart.png";

export const Checkout = () => {
  const [editOpen, setEditOpen] = useState(false);
  const [showProtectArtModal, setShowProtectArtModel] = useState(false);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [{ userCart, cartTotal, userAddresses }, dispatch] = useStateValue();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    dispatch({ type: "SET_CART_TOTAL" });
  }, [userCart, dispatch]);

  const handleOrderSuccessPopup = () => {
    setShowOrderSuccessModal(true);
    setTimeout(() => {
      setShowOrderSuccessModal(false);
    }, 3000);
    dispatch({ type: "SET_CART_ITEMS", data: [] });
    dispatch({ type: "SET_CART_TOTAL", data: 0 });
  };

  const placeOrder = async () => {
    if (!selectedAddress) {
      return toast("Select an address", { icon: "⚠️" });
    }
    const deliveryAddress = userAddresses.find(
      (address) => address.id === selectedAddress
    );
    console.log(deliveryAddress, "Delivery address");
    deliveryAddress["address_id"] = selectedAddress.toString();
    // delete deliveryAddress.id;

    const orderDetails = {
      ...deliveryAddress,
      coupon_code: "",
      cod_fee: 0,
      shipping_fee: 0,
      shipping_weight: 0,
      total_amount: cartTotal,
      total_discount: 0,
    };
    displayRazorpay(orderDetails, cartTotal, handleOrderSuccessPopup);
  };

  const { isLoading: cartIsLoading } = useQuery(["cart"], getCart, {
    onSuccess: (data) => {
      dispatch({ type: "SET_CART_ITEMS", data: data.data?.value?.products });
      dispatch({ type: "SET_CART_TOTAL", data: data.data?.value?.total });
    },
    onError: (err) => {
      // handle error
    },
  });

  // get user addresses
  const { isLoading: addressesIsLoading } = useQuery(
    ["addresses"],
    getAddresses,
    {
      onSuccess: (data) => {
        if (data.data?.value) {
          setAddresses(data.data.value);
          dispatch({ type: "SET_USER_ADDRESSES", addresses: data.data.value });
          sessionStorage.setItem("addresses", JSON.stringify(data.data.value));
        }
      },
      onError: (err) => console.log(err),
    }
  );

  return (
    <div className="main-container">
      <div className="routes">
        <Link to={"/"} className="underline-none">
          Home
        </Link>
        <PiCaretRight className="icon" />
        <Link to={"/shop"} className="underline-none">
          Shop
        </Link>
        {/* <PiCaretRight className="icon" />
        <Link to={"/product-info/:productId"} className="underline-none">
          Structural Landscape
        </Link> */}
        <PiCaretRight className="icon" />
        <Link className="underline-none">Checkout</Link>
      </div>
      {userCart.length !== 0 ? (
        <div className="checkout-grid">
          <div className="form-side" data-aos="fade-right">
            <h1>Delivery Information</h1>
            <Shipping
              addresses={userAddresses}
              isLoading={addressesIsLoading}
              selectedAddress={selectedAddress}
              selectAddress={setSelectedAddress}
            />
          </div>
          <div className="summary" data-aos="fade-left">
            <h1>Order Summary</h1>
            <div className="order-details">
              {userCart?.length > 0 &&
                userCart.map((product) => {
                  return (
                    <CartItem
                      product={product}
                      setShowProtectArtModel={setShowProtectArtModel}
                      key={product.product_details.image}
                      showProtectArtModal={showProtectArtModal}
                    />
                  );
                })}
              {/* <hr /> */}
              <div className="flex-between">
                <span>Sub Total</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex-between">
                <span>Shipping</span>
                <span>-----</span>
              </div>
              {/* <div className="flex-between">
              <span>Insurance Policy</span>
              <span>₹6045</span>
            </div> */}
              <hr />
              <div className="flex-between">
                <div>
                  <h4>Total</h4>
                  {/* <span>Monthly Payment</span> */}
                </div>
                <div>
                  <h4>₹{userCart.length !== 0 ? cartTotal : 0}</h4>
                  {/* <span>₹6045/month with EMI</span> */}
                </div>
              </div>
              <span className="link">Explore EMI Option</span>
              <button onClick={placeOrder} className="btn-primary">
                Pay ₹{userCart.length !== 0 ? cartTotal : 0}
              </button>
            </div>
          </div>
        </div>
      ) : (
        !cartIsLoading && (
          <div className="empty-img-div">
            <img src={EmptyCart} alt="empty-cart" />
          </div>
        )
      )}
      <ProtectYourArtModal
        show={showProtectArtModal}
        onHide={() => setShowProtectArtModel(false)}
      />
      <OrderSuccessModal
        show={showOrderSuccessModal}
        onHide={() => setShowOrderSuccessModal(false)}
      />
    </div>
  );
};

function ProtectYourArtModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="checkout-modal">
        <BiShield className="icon" />
        <h4>Protect your Art</h4>
        <h5>From ₹6045/mo.</h5>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita
          consequatur excepturi distinctio laudantium quos recusandae rerum non
          optio, quae, est similique enim, molestiae id ex doloribus numquam
          harum illum aliquam?
        </p>
        <h4>Have more questions?</h4>
        <span>+91 9547565652</span>
      </Modal.Body>
    </Modal>
  );
}

function OrderSuccessModal(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body className="checkout-modal">
        <img src={OrderSuccessImg} alt="" />
        <h4>Order placed, thank you!</h4>
        <p>Confirmation will be sent to your email.</p>
        <h4>Delivery date: Feb 18, 2022</h4>
      </Modal.Body>
    </Modal>
  );
}
