import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/filter_reducer";
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";
import { useProductsContext } from "./products_context";

const initialState = {
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  sort: "price-lowes",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  },
};

const FilterContext = React.createContext({
  filteredProducts: [],
  allProducts: [],
  gridView: true,
  setGridView: () => {},
  setListView: () => {},
  updateSort: () => {},
  updateFilters: () => {},
  clearFilters: () => {},
});

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatchState] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatchState({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  useEffect(() => {
    dispatchState({ type: FILTER_PRODUCTS });
    dispatchState({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters]);

  const setGridView = () => {
    dispatchState({ type: SET_GRIDVIEW });
  };

  const setListView = () => {
    dispatchState({ type: SET_LISTVIEW });
  };

  const updateSort = (event) => {
    // const name = event.target.name;
    const value = event.target.value;
    dispatchState({ type: UPDATE_SORT, payload: value });
  };

  const updateFilters = (event) => {
    const name = event.target.name;
    let value = event.target.value;
    if (name === "category") value = event.target.textContent;
    if (name === "color") value = event.target.dataset.color;
    if (name === "price") value = +value;
    if (name === "shipping") value = event.target.checked;
    dispatchState({ type: UPDATE_FILTERS, payload: { name, value } });
  };

  const clearFilters = () => {
    dispatchState({ type: CLEAR_FILTERS });
  };

  return (
    <FilterContext.Provider
      value={{
        ...state,
        setGridView,
        setListView,
        updateSort,
        updateFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext);
};
