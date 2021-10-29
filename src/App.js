import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import { useUserContext } from "./context/user_context";

import {
  Home,
  Products,
  SingleProduct,
  Cart,
  About,
  Checkout,
  Error,
  PrivateRoute,
} from "./pages/index";
import Login from "./pages/login";
import Signup from "./pages/signup";

function App() {
  const { isLoggedIn } = useUserContext();

  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products">
          <Products />
        </Route>
        <Route exact path="/products/:id">
          <SingleProduct />
        </Route>
        <PrivateRoute exact path="/success-shopping">
          <Checkout />
        </PrivateRoute>
        {!isLoggedIn && (
          <Route path="/login">
            <Login />
          </Route>
        )}
        {!isLoggedIn && (
          <Route path="/signup">
            <Signup />
          </Route>
        )}
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
