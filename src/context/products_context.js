import axios from "axios";
import React, { useCallback, useContext, useEffect, useReducer } from "react";
import reducer from "../reducers/products_reducer";
import { products_url as url } from "../utils/constants";
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
};

const ProductsContext = React.createContext({
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
  openSidebar: () => {},
  closeSidebar: () => {},
  fetchSingleProduct: () => {},
});

export const ProductsProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatchState({ type: SIDEBAR_OPEN });
  };

  const closeSidebar = () => {
    dispatchState({ type: SIDEBAR_CLOSE });
  };

  //fetching data from the api
  const fetchProducts = async (url) => {
    dispatchState({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatchState({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatchState({ type: GET_PRODUCTS_ERROR });
      console.log(error);
    }
  };

  //fetching single product data from api
  const fetchSingleProduct = useCallback((url) => {
    const getData = async (url) => {
      dispatchState({ type: GET_SINGLE_PRODUCT_BEGIN });
      try {
        const response = await axios.get(url);
        const data = response.data;
        dispatchState({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: data });
      } catch (error) {
        dispatchState({ type: GET_SINGLE_PRODUCT_ERROR });
      }
    };
    
    getData(url);
    
  }, []);

  useEffect(() => {
    fetchProducts(url);
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        ...state,
        openSidebar: openSidebar,
        closeSidebar: closeSidebar,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext);
};
