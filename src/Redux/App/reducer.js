import * as types from "./actionTypes";
const intialState = {
  products: [],
  cart: [],
  isLoading: false,
  isError: false,
};

export const reducer = (state = intialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.GET_PRODUCTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case types.GET_PRODUCTS_SUCCESS: {
      return {
        ...state,
        products: payload,
        isLoading: false,
        isError: false,
      };
    }
    case types.GET_PRODUCTS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};
