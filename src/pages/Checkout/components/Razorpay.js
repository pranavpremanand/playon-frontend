import axios from "axios";
import Logo from "../../../assets/svgs/logo-svg.svg";
import { createOrder, doPayment } from "../../../apiCall";
import { toast } from "react-hot-toast";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function displayRazorpay(
  orderDetails,
  totalAmount,
  successMessage
) {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

  if (!res) {
    return toast.error("Razorpay SDK failed to load. Are you online?");
  }

  // creating a new order
  try {
    let result = await doPayment(totalAmount);
    if (result.data) {
      //   Getting the order details back
      var {
        razorpay_amount: amount,
        razorpay_order_id: orderId,
        razorpay_merchant_key: merchantKey,
        currency,
      } = result.data.order;
    }
  } catch (err) {
    return toast.error("Something went wrong, please try again");
  }

  const options = {
    key: merchantKey,
    amount: amount,
    currency: currency,
    name: "Play On",
    description: "Test Transaction",
    image: Logo,
    order_id: orderId,
    handler: async function (response) {
      orderDetails = {
        ...orderDetails,
        payment_id: response.razorpay_payment_id,
        order_id: response.razorpay_order_id,
        payment_method: "Prepaid",
      };
      try {
        const response = await createOrder(orderDetails);
        if (response.data?.status[0].Message === "success") {
          successMessage();
        } else {
          toast.error(response.data.status[0].ResponseMessage);
        }
      } catch (err) {
        toast.error("Something went wrong please refresh the page");
      }
    },

    prefill: {
      name: "Soumya Dey",
      email: "SoumyaDey@example.com",
      contact: "9999999999",
    },
    notes: {
      address: "Soumya Dey Corporate Office",
    },
    theme: {
      color: "#f5bf7d",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
}
