import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      company,
      category,
      color,
      minPrice,
      maxPrice,
      shipping,
      price,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colors = getUniqueValues(allProducts, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(event) => event.preventDefault()}>
          {/* search input ..... */}
          <div className="form-control">
            <input
              value={text}
              type="text"
              name="text"
              placeholder="search..."
              className="search-input"
              onChange={updateFilters}
            />
          </div>

          {/* input category ....... */}
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((c, index) => {
                return (
                  <button
                    key={index}
                    name="category"
                    className={category === c.toLowerCase() ? "active" : null}
                    onClick={updateFilters}
                  >
                    {c}
                  </button>
                );
              })}
            </div>
          </div>

          {/* input company ......... */}
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              value={company}
              className="company"
              onChange={updateFilters}
            >
              {companies.map((cmpni, index) => {
                return (
                  <option key={index} value={cmpni}>
                    {cmpni}
                  </option>
                );
              })}
            </select>
          </div>

          {/* input colors ........ */}
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              {colors.map((clr, index) => {
                if (clr === "all") {
                  return (
                    <button
                      name="color"
                      key={index}
                      onClick={updateFilters}
                      className={color === clr ? "all-btn active" : "all-btn"}
                      data-color="all"
                    >
                      all
                    </button>
                  );
                }
                return (
                  <button
                    key={index}
                    name="color"
                    data-color={clr}
                    style={{ background: clr }}
                    className={color === clr ? "color-btn active" : "color-btn"}
                    onClick={updateFilters}
                  >
                    {color === clr && <FaCheck />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* input price .... */}
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              min={minPrice}
              max={maxPrice}
              onChange={updateFilters}
              value={price}
            />
          </div>
          {/* input shipping.... */}
          <div className="form-control shipping">
            <input
              className="rd"
              type="checkbox"
              name="shipping"
              id="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
            <label htmlFor="shipping">free shipping</label>
          </div>
        </form>
        <button className="clear-btn" onClick={clearFilters}>
          clear filters
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .content .search-input {
    padding: 0.5rem 0;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
    margin: 0;
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }

  // .......................................

  .rd {
    content: "1";
    text-align: center;
    position: relative;
    width: 30px;
    height: 19px;
    appearance: none;
    background-color: #c6c6c6;
    border-radius: 50px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    transition: all 0.2s;
  }

  .rd:checked {
    background-color: var(--clr-primary-6);
  }

  .rd:after {
    content: "";
    /* text-align: center; */
    /* line-height: 82px; */
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transform: scale(1.2);
    background-color: #fff;

    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    top: 0.5px;
    left: 0;
    transition: all 0.2s;
  }

  .rd:checked:after {
    content: "";
    /* line-height: 82px; */
    /* text-align: center; */
    left: 12px;
    background-color: var(--clr-primary-8);
  }

  // .......................................

  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
