import React, { useEffect, useContext, useReducer, useCallback } from "react";
import reducer from "../reducers/cart_reducer";
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from "../actions";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) return JSON.parse(cart);
  return [];
};

const initialState = {
  cart: getLocalStorage(),
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 534,
};

const CartContext = React.createContext({
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 0,
  addToCart: () => {},
  removeItem: () => {},
  toggleAmount: () => {},
  clearCart: () => {},
});

export const CartProvider = ({ children }) => {
  const [state, dispatchState] = useReducer(reducer, initialState);

  //ad to cart
  const addToCart = (id, color, amount, product) => {
    dispatchState({
      type: ADD_TO_CART,
      payload: { id, color, amount, product },
    });
  };

  //remove Item
  const removeItem = (id) => {
    dispatchState({ type: REMOVE_CART_ITEM, payload: id });
  };

  //toggle amount
  const toggleAmount = useCallback((id, value) => {
    dispatchState({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  }, []);

  //clear cart
  const clearCart = () => {
    dispatchState({ type: CLEAR_CART });
  };

  useEffect(() => {
    dispatchState({ type: COUNT_CART_TOTALS });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, clearCart, toggleAmount, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
// make sure use
export const useCartContext = () => {
  return useContext(CartContext);
};
