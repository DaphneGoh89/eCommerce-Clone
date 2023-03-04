import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(null);

  let loginUser = async (e) => {
    e.preventDefault();

    try {
      let response = await axios.post("http://127.0.0.1:5005/user/login", {
        email: e.target.loginEmail.value,
        password: e.target.loginPassword.value,
      });

      if (response.status === 200) {
        let data = response.data;
        setAuthToken(data);
        setUser(jwt_decode(data.access_token));
        localStorage.setItem("authTokens", JSON.stringify(data));
        console.log("login data", data);
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.log("Error", error.message);
    }
  };

  let contextData = {
    loginUser: loginUser,
    authToken: authToken,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
