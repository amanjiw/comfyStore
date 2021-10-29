import React, { useContext, useState } from "react";

const UserContext = React.createContext({
  token: "",
  isLoggedIn: false,
  getUser: () => {},
  logout: () => {},
});
const getToken = localStorage.getItem("JWT");
console.log(getToken);
export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(getToken);
  const isLoggedIn = !!token;

  // fetch data ...
  const getUser = async (email, password, url) => {
    console.log("start post data");
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 400) return null;
      else {
        const data = await response.json();

        console.log(data.idToken);
        setToken(data.idToken);
        localStorage.setItem("JWT", data.idToken);
        console.log("finish and get data");
      }
    } catch (error) {
      console.error(error.response.data.error.errors[0].message);
    }
  };

  //logout user ...
  const logout = () => {
    localStorage.removeItem("JWT");
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ token, isLoggedIn, logout, getUser }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use

export const useUserContext = () => {
  return useContext(UserContext);
};

//axios

// const response = await axios.post(url, {
//   email: email,
//   password: password,
//   returnSecureToken: true,
// });
