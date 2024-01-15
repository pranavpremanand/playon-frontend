export const initialState = {
  userLoggedIn:
    sessionStorage.getItem("token") || localStorage.getItem("token")
      ? true
      : false,
  users: [],
  categories: [],
  isLoading: false,
};

function reducer(state, action) {
  // console.log(action);
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.status,
      };

    case "SET_USERS":
      return {
        ...state,
        users: action.data,
      };

    case "CHANGE_USER_STATUS":
      const updatedList = state.users.map((user) => {
        if (user._id === action.userId) {
          user.isBlocked = action.updatedStatus;
        }
        return user;
      });
      return {
        ...state,
        users: updatedList,
      };

    case "SET_CATEGORIES":
      return { ...state, categories: action.data };

    case "DELETE_CATEGORY":
      const updatedCategoryList = state.categories.filter(
        (category) => category._id !== action.categoryId
      );
      return { ...state, categories: updatedCategoryList };

    
    default:
      return state;
  }
}

export default reducer;
