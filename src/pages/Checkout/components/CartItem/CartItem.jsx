import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { domainName } from "../../../../Constants";
import "../../Checkout.scss";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFromCart, updateQuantity } from "../../../../apiCall";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useStateValue } from "../../../../StateProvider";
import { useLocation } from "react-router-dom";

export const CartItem = ({
  product,
  setShowProtectArtModel,
  showProtectArtModal,
}) => {
  console.log(product, "product");
  const [{ cartTotal, userCart }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(product.quantity);
  const [subtotal, setSubtotal] = useState(product.sub_total);
  const [currentChange, setCurrentChange] = useState("");
  const [currProduct, setCurrProduct] = useState({});

  useEffect(() => {
    setCurrProduct(
      userCart.find(
        (item) =>
          item.product_details.product_id === product.product_details.product_id
      )
    );
  }, [userCart, currProduct, product.product_details.product_id]);

  // change quantity mutation
  const changeQuantityMutation = useMutation(updateQuantity, {
    onSuccess: (data) => {
      console.log(data.data, "response");
      if (data.data?.status[0]?.Message === "success") {
        if (currentChange === "+") {
          dispatch({
            type: "INCREMENT_CART_QUANTITY",
            data: product.product_details.product_id,
          });
          setCurrentChange("");
        } else if (currentChange === "-") {
          dispatch({
            type: "DECREMENT_CART_QUANTITY",
            data: product.product_details.product_id,
          });
          setCurrentChange("");
        }
      }
    },
    onError: (err) => console.log(err, "error"),
  });

  // remove item from cart
  const removeFromCart = async () => {
    try {
      const response = await deleteFromCart(product.product_details.product_id);
      console.log(response);
      if (response.data?.status[0]?.Message === "success") {
        toast.success(`Removed ${product.product_details.title} from cart`);
        const deletedItem = userCart.find(
          (item) =>
            item.product_details.product_id ===
            product.product_details.product_id
        );
        const updatedUserCart = userCart.filter(
          (item) =>
            item?.product_details?.product_id !==
            product.product_details.product_id
        );
        dispatch({
          type: "SET_CART_ITEMS",
          data: updatedUserCart,
        });

        dispatch({
          type: "SET_CART_TOTAL",
          data: cartTotal - deletedItem.sub_total,
        });
      }
    } catch (err) {
      console.log(err, "error");
    }
  };

  // increase item quantity
  const increment = () => {
    const data = {
      productId: product.product_details.product_id,
      quantity: currProduct.quantity,
    };
    setCurrentChange("+");
    changeQuantityMutation.mutate(data);
  };

  // decrease item quantity
  const decrement = () => {
    const data = {
      productId: product.product_details.product_id,
      quantity: currProduct.quantity,
    };
    setCurrentChange("-");

    changeQuantityMutation.mutate(data);
  };
  return (
    <div className="item">
      <div className="details">
        <img
          src={`${domainName}${product.product_details.image}`}
          alt="product"
        />
        <div className="info">
          <div className="grid">
            <div className="">
              <span className="product-title">{product.product_details.title}</span>
              <p>{product.product_details.category}</p>
            </div>
            <div>
              {/* <select name="quantity" id="">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select> */}
              <div className="quantity">
                <AiFillMinusCircle
                  className="icon"
                  onClick={() => decrement()}
                />
                <span>{currProduct.quantity}</span>
                <AiFillPlusCircle
                  className="icon"
                  onClick={() => increment()}
                />
              </div>
            </div>
            <div style={{ position: "relative", top: "0.5rem" }}>
              <span className="product-price">
                ₹{product.product_details.price} X {currProduct.quantity} = ₹
                {currProduct.sub_total}
              </span>
              {product.product_details.emi && (
                <p>₹{product.product_details.emi}/month with EMI</p>
              )}
            </div>
          </div>
          <div className="remove" onClick={removeFromCart}>
            Remove
          </div>
        </div>
      </div>

      <hr />
      {/* <div className="art-protection">
        <h3>Protect your Art</h3>
        <h4>₹6900.00</h4>
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore vel
          similique quasi illo nulla mollitia, eos odio.
          <span
            className="link"
            onClick={() => setShowProtectArtModel(!showProtectArtModal)}
          >
            Learn More
          </span>
        </p>
        <span className="remove">Remove</span>
      </div> */}
    </div>
  );
};
