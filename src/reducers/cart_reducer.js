// import { FaAcquisitionsIncorporated } from "react-icons/fa";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((i) => i.id === id + color);

    if (tempItem) {
      const index = state.cart.indexOf(tempItem);
      const tempCart = [...state.cart];
      let newAmount = tempItem.amount + amount;
      if (newAmount > tempItem.max) newAmount = tempItem.max;
      tempCart[index] = { ...tempItem, amount: newAmount };
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };

      return { ...state, cart: [...state.cart, newItem] };
    }
  }

  if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter((item) => item.id !== action.payload);
    return { ...state, cart: tempCart };
  }

  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value: newAmount } = action.payload;
    const tempCart = [...state.cart];
    const index = tempCart.findIndex((item) => item.id === id);
    tempCart[index] = { ...tempCart[index], amount: newAmount };
    return { ...state, cart: tempCart };
  }

  if (action.type === COUNT_CART_TOTALS) {
    const { totalItems, totalAmount } = state.cart.reduce(
      (total, cartItem) => {
        const { amount, price } = cartItem;
        total.totalItems += amount;
        total.totalAmount += price * amount;

        return total;
      },
      {
        totalItems: 0,
        totalAmount: 0,
      }
    );
    return { ...state, totalItems, totalAmount };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
