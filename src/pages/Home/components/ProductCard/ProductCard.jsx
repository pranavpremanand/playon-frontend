import { FaHeart } from "react-icons/fa";
import TickIcon from "../../../../assets/images/tick-bg-blue.png";
import "./ProductCard.scss";
import { useEffect, useState } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router";
import { domainName } from "../../../../Constants";
import { addToFavorites, removeFromFavorites } from "../../../../apiCall";
import { useStateValue } from "../../../../StateProvider";
import { toast } from "react-hot-toast";

export const ProductCard = ({ item }) => {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  const [{ favorites, userLoggedIn }, dispatch] = useStateValue();

  // useEffect(() => {
  //   setLiked(favorites.some((art) => art.id === parseInt(item.id)));
  // }, [favorites, item.id]);

  // add item to favorite list
  // const addToFavoritesList = async () => {
  //   if (!userLoggedIn) {
  //     navigate("/login");
  //   } else {
  //     setLiked(true);
  //     try {
  //       const response = await addToFavorites(item.id);
  //       console.log(response.data, "addToFavorites");
  //       if (response.data?.status[0].Error === "False") {
  //         toast.success(`${item.title} added to favorites`);
  //         dispatch({
  //           type: "ADD_TO_FAVORITES_LIST",
  //           item: { ...item, main_image: `/uploads/${item.main_image}` },
  //         });
  //       }
  //     } catch (err) {
  //       console.log(err, "addToFavorites error");
  //     }
  //   }
  // };

  // // remove item from favorite list
  // const removeFromFavoritesList = async () => {
  //   setLiked(false);
  //   try {
  //     const response = await removeFromFavorites(item.id);
  //     console.log(response.data, "removeFromFavorites");
  //     if (response.data?.status[0].Error === "False") {
  //       toast.success(`${item.title} removed from favorites`);
  //       dispatch({ type: "REMOVE_FROM_FAVORITES_LIST", item: item });
  //     }
  //   } catch (err) {
  //     console.log(err, "removeFromFavorites error");
  //   }
  // };
  return (
    <div
      className="art slider-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        onClick={() => navigate(`/product-info/${item?.id}`)}
        src={item}
        // src={`${domainName}/uploads/${item.main_image}`}
        alt=""
        className="slider-img"
      />
      {hovered && (
        <div className="details">
          <div className="flex-between">
            <span>Jersey</span>
            {liked ? (
              <FaHeart
                color="red"
                className="heart-icon heart-filled-icon icon-heart"
                // onClick={removeFromFavoritesList}
              />
            ) : (
              <AiOutlineHeart
                className="heart-icon outline-heart-icon icon-heart"
                // onClick={addToFavoritesList}
              />
            )}
          </div>

          <div className="flex-column">
            <span>{"National Jerseys"}</span>
            {/* {item?.owner && <span>Owner : {item.owner}</span>} */}
            <span className="price">₹1500</span>
            <span className="flex-end">
              <img src={TickIcon} alt="tick-icon" />
              <span>In Stock</span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
