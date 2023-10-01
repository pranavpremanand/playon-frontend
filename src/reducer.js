export const initialState = {
  userLoggedIn:
    sessionStorage.getItem("token") || localStorage.getItem("token")
      ? true
      : false,
  showProfileOptions: false,
  userCart: [],
  cartTotal: "",
  userAddresses: [],
  favorites: [],
  isLoading: false,
};

function reducer(state, action) {
  // console.log(action);
  switch (action.type) {
    case "SET_LOGIN_STATUS":
      return {
        ...state,
        userLoggedIn: action.status,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.status,
      };

    case "PROFILE_OPTIONS_VIEW":
      return {
        ...state,
        showProfileOptions: action.status,
      };

    case "SET_CART_ITEMS":
      return {
        ...state,
        userCart: action.data,
      };

    case "INCREMENT_CART_QUANTITY":
      const updatedCart = state.userCart.map((item) => {
        console.log(item.product_details, "item.product_details");
        if (item.product_details.product_id === action.data) {
          let quantity = item.quantity + 1;
          let subtotal = item?.product_details?.price * quantity;
          return {
            ...item,
            quantity: quantity,
            sub_total: subtotal,
            product_details: {
              ...item.product_details,
              current_stock: item.product_details.current_stock - 1,
            },
          };
        } else {
          return item;
        }
      });
      return { ...state, userCart: updatedCart };

    case "DECREMENT_CART_QUANTITY":
      const newCart = state.userCart.map((item) => {
        if (item.product_details.product_id === action.data) {
          let quantity = item.quantity - 1;
          if (quantity <= 0) {
            quantity = 1;
          }
          let subtotal = item?.product_details?.price * quantity;
          return {
            ...item,
            quantity: quantity,
            sub_total: subtotal,
            product_details: {
              ...item.product_details,
              current_stock: item.product_details.current_stock + 1,
            },
          };
        } else {
          return item;
        }
      });
      return { ...state, userCart: newCart };

    case "SET_CART_TOTAL":
      let total = state.userCart.reduce((initialVal, currElem) => {
        let { sub_total } = currElem;
        return (initialVal = initialVal + sub_total);
      }, 0);
      return {
        ...state,
        cartTotal: total,
      };

    case "SET_USER_ADDRESSES":
      return {
        ...state,
        userAddresses: action.addresses,
      };

    case "DELETE_USER_ADDRESS":
      return {
        ...state,
        userAddresses: state.userAddresses.filter(
          (address) => address.id !== action.id
        ),
      };

    case "SET_FAVORITE_LIST":
      return { ...state, favorites: action.data };

    case "ADD_TO_FAVORITES_LIST":
      return { ...state, favorites: [...state.favorites, action.item] };

    case "REMOVE_FROM_FAVORITES_LIST":
      return {
        ...state,
        favorites: state.favorites.filter((item) => item.id !== action.item.id),
      };

    default:
      return state;
  }
}

export default reducer;
