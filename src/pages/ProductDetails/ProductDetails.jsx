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
import { useKeenSlider } from "keen-slider/react";

function ThumbnailPlugin(mainRef) {
  return (slider) => {
    function removeActive() {
      slider.slides.forEach((slide) => {
        slide.classList.remove("active");
      });
    }
    function addActive(idx) {
      slider.slides[idx].classList.add("active");
    }

    function addClickEvents() {
      slider.slides.forEach((slide, idx) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx);
        });
      });
    }

    slider.on("created", () => {
      if (!mainRef.current) return;
      addActive(slider.track.details.rel);
      addClickEvents();
      mainRef.current.on("animationStarted", (main) => {
        removeActive();
        const next = main.animator.targetIdx || 0;
        addActive(main.track.absToRel(next));
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
      });
    });
  };
}

export const ProductDetails = () => {
  const [{ favorites, userLoggedIn }, dispatch] = useStateValue();
  const { productId } = useParams();
  const [liked, setLiked] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider({
    initial: 0,
    loop: true,
  });
  const [thumbnailRef] = useKeenSlider(
    {
      initial: 0,
      slides: {
        perView: 4,
        // spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  );

  // useEffect(() => {
  //   setLiked(favorites.some((item) => item.id === parseInt(productId)));
  // }, [favorites, productId]);

  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState("");
  const [buyNowClicked, setBuyNowClicked] = useState(false);

  // add item to cart
  const addProductToCart = (pdtId) => {};

  // add item to favorite list
  const addToFavoritesList = async () => {};

  // remove item from favorite list
  const removeFromFavoritesList = async () => {};

  // handle size selection
  const handleSelectSize = (e) => {
    console.log(e);
    setSelectedSize(e.target.value);
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
          <div className="image-main keen-slider" ref={sliderRef}>
            {/* <div className="icon-bg">
              <PiCaretLeft className="icon" />
            </div>
            <div className="icon-bg">
              <PiCaretRight
                className="icon"
                // onClick={() => changeCurrentSlide("+")}
              />
            </div> */}
            <img src={products[0]} alt="" className="keen-slider__slide" />
            <img src={products[2]} alt="" className="keen-slider__slide" />
            <img src={products[1]} alt="" className="keen-slider__slide" />
          </div>
          <div ref={thumbnailRef} className="keen-slider thumbnail sub-images">
            <img src={products[0]} alt="" className="keen-slider__slide" />
            <img src={products[2]} alt="" className="keen-slider__slide" />
            <img src={products[1]} alt="" className="keen-slider__slide" />
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
          <div className="sizes-div">
            <button
              onClick={handleSelectSize}
              value="XS"
              className={`size ${selectedSize === "XS" && "active"}`}
            >
              XS
            </button>
            <button
              onClick={handleSelectSize}
              value="S"
              className={`size ${selectedSize === "S" && "active"}`}
            >
              S
            </button>
            <button
              onClick={handleSelectSize}
              value="M"
              className={`size ${selectedSize === "M" && "active"}`}
            >
              M
            </button>
            <button
              onClick={handleSelectSize}
              value="L"
              className={`size ${selectedSize === "L" && "active"}`}
            >
              L
            </button>
            <button
              onClick={handleSelectSize}
              value="XL"
              className={`size ${selectedSize === "XL" && "active"}`}
            >
              XL
            </button>
          </div>
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
