import React from "react";
import styled from "styled-components";
import { PageHero } from "../components"; //, StripeCheckout
// extra imports
// import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page-100">
        <h1 className="section shopping-done">you shopping is done.</h1>
        <div>
          <Link to="/products" className="btn btn-center">
            shop again
          </Link>
        </div>
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  .shopping-done {
    text-align: center;
  }

  div {
    width: 20%;
    margin: 0 auto;
  }

  .btn-center {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 700px) {
    div {
      width: 60%;
      margin: 0 auto;
    }
  }
`;
export default CheckoutPage;
