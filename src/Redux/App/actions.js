import * as types from "./actionTypes";
import axios from "axios";
const getProductsData = () => (dispatch) => {
  dispatch({ type: types.GET_PRODUCTS_REQUEST });
  axios
    .get(
      "https://leaguex.s3.ap-south-1.amazonaws.com/task/shopping/catalogue.json"
    )
    .then((res) =>
      dispatch({ type: types.GET_PRODUCTS_SUCCESS, payload: res.data })
    )
    .catch((err) =>
      dispatch({ type: types.GET_PRODUCTS_FAILURE, payload: err })
    );
};


export { getProductsData };
