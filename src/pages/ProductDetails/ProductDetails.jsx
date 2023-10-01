import { Link, useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.scss";
import { PiCaretRight, PiCaretLeft } from "react-icons/pi";
import artImage from "../../assets/arts/art (3).png";
import artImage1 from "../../assets/arts/art (7).png";
import artImage2 from "../../assets/arts/art (4).png";
import { TfiTruck } from "react-icons/tfi";
import { FaHeart } from "react-icons/fa";
import {
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShareAlt,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { BestSelling } from "../../components/BestSelling/BestSelling";
import { Accordion } from "../Home/components/Accordion/Accordion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  addToFavorites,
  fetchProductInfo,
  removeFromFavorites,
} from "../../apiCall";
import { toast } from "react-hot-toast";
import { domainName } from "../../Constants";
import { useStateValue } from "../../StateProvider";
import { Slide } from "react-slideshow-image";
import { Rating } from "react-simple-star-rating";
import { products } from "../Home/Home";

export const ProductDetails = () => {
  const [{ favorites, userLoggedIn }, dispatch] = useStateValue();
  const { productId } = useParams();
  const [liked, setLiked] = useState(false);

  // useEffect(() => {
  //   setLiked(favorites.some((item) => item.id === parseInt(productId)));
  // }, [favorites, productId]);

  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(null);
  const [buyNowClicked, setBuyNowClicked] = useState(false);

  // fetch product info
  // const { data, isLoading } = useQuery(
  //   ["product-info", productId],
  //   fetchProductInfo,
  //   {
  //     onSuccess: (data) => {
  //       setProduct(data.data?.value);
  //       console.log(data.data?.value, "data is here");
  //     },
  //     onError: (err) => {
  //       console.log(err, "ERROR");
  //       if (err.message) {
  //         toast.error(err.message);
  //       } else {
  //         toast.error("Something went wrong");
  //       }
  //     },
  //   }
  // );

  // const changeCurrentSlide = (type) => {
  //   if (type === "+") {
  //     if (currentSlide === product?.sub_images?.length - 1) {
  //       setCurrentSlide(0);
  //     } else {
  //       setCurrentSlide((prev) => prev + 1);
  //     }
  //   } else {
  //     if (currentSlide === 0 || !currentSlide) {
  //       setCurrentSlide(product.sub_images?.length - 1);
  //     } else {
  //       setCurrentSlide((prev) => prev - 1);
  //     }
  //   }
  // };

  // cart mutation function
  // const addToCartMutation = useMutation({
  //   mutationFn: addToCart,
  //   onSuccess: (data) => {
  //     if (data.data?.status[0]?.Error === "False") {
  //       toast.success(`${product.title} added to cart`);
  //       // queryClient.invalidateQueries("cart");
  //     }
  //     if(buyNowClicked){
  //       setBuyNowClicked(false)
  //       navigate('/checkout')
  //     }
  //   },
  //   onError: (err) => {
  //     console.log(err, "error");
  //   },
  // });

  // add item to cart
  const addProductToCart = (pdtId) => {
    // if (!userLoggedIn) {
    //   navigate("/login");
    // } else {
    //   addToCartMutation.mutate({ productId: pdtId, quantity: 1 });
    // }
  };

  // add item to favorite list
  const addToFavoritesList = async () => {
    // if (!userLoggedIn) {
    //   navigate("/login");
    // } else {
    //   setLiked(true);
    //   try {
    //     const response = await addToFavorites(product.id);
    //     console.log(response.data, "addToFavorites");
    //     if (response.data?.status[0].Error === "False") {
    //       toast.success(`${product.title} added to favorites`);
    //       dispatch({
    //         type: "ADD_TO_FAVORITES_LIST",
    //         item: { ...product, main_image: `/uploads/${product.main_image}` },
    //       });
    //     }
    //   } catch (err) {
    //     console.log(err, "addToFavorites error");
    //   }
    // }
  };

  // remove item from favorite list
  const removeFromFavoritesList = async () => {
    // setLiked(false);
    // try {
    //   const response = await removeFromFavorites(product.id);
    //   console.log(response.data, "removeFromFavorites");
    //   if (response.data?.status[0].Error === "False") {
    //     toast.success(`${product.title} removed from favorites`);
    //     dispatch({ type: "REMOVE_FROM_FAVORITES_LIST", item: product });
    //   }
    // } catch (err) {
    //   console.log(err, "removeFromFavorites error");
    // }
  };

  return (
    <div className="main">
      <div className="routes">
        <Link to={"/"} className="underline-none">
          Home
        </Link>
        <PiCaretRight className="icon" />
        <Link to={"/shop"} className="underline-none">
          Shop
        </Link>
        <PiCaretRight className="icon" />
        <Link className="underline-none">Jersey name</Link>
      </div>
      <div className="product-container">
        <div className="images-container" data-aos="fade-right">
          <div className="image-main">
            <div className="icon-bg">
              <PiCaretLeft className="icon" />
            </div>
            <div className="icon-bg">
              <PiCaretRight
                className="icon"
                // onClick={() => changeCurrentSlide("+")}
              />
            </div>
            <img src={products[0]} alt="" />
          </div>
          <div className="sub-images">
            <img className="active" src={products[0]} alt="" />
            <img src={products[0]} alt="" />
            <img src={products[0]} alt="" />
          </div>
          <div className="options">
            <div>
              {liked ? (
                <>
                  <FaHeart
                    color="red"
                    className="heart-icon icon heart-filled-icon icon-heart"
                    onClick={removeFromFavoritesList}
                  />
                  <span>Added to Favorites</span>
                </>
              ) : (
                <>
                  <AiOutlineHeart
                    className="heart-icon icon outline-heart-icon icon-heart"
                    onClick={addToFavoritesList}
                  />
                  <span>Add to Favorites</span>
                </>
              )}
            </div>
            {/* <div>
              <AiOutlineEye className="icon" />
              <span>See in Your Room</span>
            </div> */}
            <div>
              <AiOutlineShareAlt className="icon" />
              <span>Share</span>
            </div>
          </div>
        </div>
        <div className="product-details" data-aos="fade-left">
          <h1>Argentina Home Jersey 2022</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime
            aliquid pariatur, esse harum sapiente sequi. Placeat delectus ipsa
            quas explicabo molestias non aliquam impedit, natus, fugit odio
            nihil laborum. Error!
          </p>
          <Rating
            initialValue={5}
            size={28}
            readonly
            className="rating-icons"
          />
          <h2>₹2500</h2>
          {/* {product.current_stock > 0 ? ( */}
          <>
            <div className="buttons">
              <button
                className="btn-secondary"
                onClick={() => addProductToCart(product.id)}
              >
                add to bag
              </button>
              <button
                className="btn-primary"
                onClick={() => {
                  setBuyNowClicked(true);
                  addProductToCart(product.id);
                }}
              >
                buy now
              </button>
            </div>
          </>
          {/* ) : (
            <button className="btn-gray" disabled>
              out of stock
            </button>
          )} */}
          {/* <div className="delivery-input">
            <label htmlFor="">Check Delivery Dates</label>
            <div className="input-box">
              <input type="tel" name="pincode" placeholder="Enter Pincode" />
              <span>Apply</span>
            </div>
            <div className="truck">
              <TfiTruck className="icon" />
              <span>Delivered to Ahmedabad : April 6th</span>
            </div>
          </div> */}
          <span>Categories : International Jerseys</span>
          {/* {product.description && ( */}
          <>
            <h4>Description</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ad
              molestias totam, deleniti quisquam corporis nobis incidunt
              nostrum, provident nam, repudiandae reiciendis beatae et autem id
              cupiditate quidem quae? Consequuntur?
            </p>
          </>
          {/* )} */}
          {/* <Accordion content={"Shipping and Taxes"} /> */}
        </div>
      </div>

      <BestSelling />
    </div>
  );
};
