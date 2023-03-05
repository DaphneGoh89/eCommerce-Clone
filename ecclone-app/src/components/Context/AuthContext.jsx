import { createContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

//----------------------------------------------------------------------------------------------
// Create AuthContext
const AuthContext = createContext();

export default AuthContext;

//-----------------------------------------------------------------------------------------------
// Declare AuthProvider
export const AuthProvider = ({ children }) => {
  // Get default state from local storage - access token
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(
    localStorage.getItem("authTokens")
      ? jwt_decode(
          JSON.parse(localStorage.getItem("authTokens"))["access_token"]
        )?.firstName
      : null
  );
  const [userId, setUserId] = useState(
    localStorage.getItem("authTokens")
      ? jwt_decode(
          JSON.parse(localStorage.getItem("authTokens"))["access_token"]
        )?.userId
      : null
  );

  //-------------------------------------------------------------------------
  // Login User Function
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

        // Decode access token
        let decodedToken = jwt_decode(data.access_token);
        setUser(decodedToken?.firstName);
        setUserId(decodedToken?.userId);
        localStorage.setItem("authTokens", JSON.stringify(data));
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
    user: user,
    userId: userId,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
