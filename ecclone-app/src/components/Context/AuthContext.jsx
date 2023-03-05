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
  const [status, setStatus] = useState(null);
  const [statusText, setStatusText] = useState(null);

  //-------------------------------------------------------------------------
  // Login User Function
  let loginUser = async (e) => {
    e.preventDefault();

    try {
      setStatus(null);
      setStatusText(null);

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
      }
      // Set status text for display
      setStatus(response.status);
      setStatusText("Login successful. Happy shopping!");
    } catch (error) {
      setStatus("404");
      setStatusText(
        "Oops! Looks like something is incorrect. Please try again!"
      );
    }
  };

  let contextData = {
    loginUser: loginUser,
    authToken: authToken,
    user: user,
    userId: userId,
    status: status,
    statusText: statusText,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
