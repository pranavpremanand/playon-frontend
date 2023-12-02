import React from "react";
import "./SearchResultItem.scss";

const SearchResultItem = (item) => {
  return (
    <div className="item">
      <img src={`${item.image}`} alt="product" />
      <span>{item.name}</span>
      <span>₹{item.price}</span>
    </div>
  );
};

export default SearchResultItem;
