import React, { useRef } from "react";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Login = (props) => {
  const { getUser } = useUserContext();
  const history = useHistory();
  const inputEmailRef = useRef();
  const inputPasswordRef = useRef();

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    const emailValue = inputEmailRef.current.value;
    const passwordValue = inputPasswordRef.current.value;
    const response = await getUser(
      emailValue,
      passwordValue,
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAc7bggmJaFPV73NEXFvsicWyt9tLdHB4M"
    );

    if (response === undefined) history.replace("/");
  };

  return (
    <Wrapper>
      <div className=" page-100 container">
        <div className="">Login to you account"</div>
        <form className="form" onSubmit={formSubmitHandler}>
          <label htmlFor="email">Email</label>
          <input ref={inputEmailRef} type="email" id="email" />
          <label htmlFor="password">Password</label>
          <input ref={inputPasswordRef} type="password" id="password" />
          <button className="btn" type="submit">
            Login
          </button>
          <Link to="/signup">
            <p className="signup">signUp</p>
          </Link>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .container {
    /* width: 1200px; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
  }

  .form {
    display: flex;
    width: 20%;
    flex-direction: column;
    gap: 10px;
    margin-top: 30px;
  }

  .form input {
    height: 30px;
  }

  .form label {
    margin-bottom: -10px;
  }

  .form button {
    margin-top: 50px;
    margin-bottom: 20px;
  }

  .signup {
    display: inline;
    padding: 10px;
    color: hsl(22, 28%, 21%);
    transition: all 0.3s;
  }

  .signup:hover {
    border-bottom: 1px solid hsl(22, 28%, 45%);
  }

  .switch {
    width: 200px;
  }

  @media (max-width: 1024px) {
    .form {
      width: 50%;
    }
  }

  @media (max-width: 500px) {
    .form {
      width: 90%;
    }
  }
`;

export default Login;
