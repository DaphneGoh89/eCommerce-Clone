import React from "react";
import jwt_decode from "jwt-decode";

const CustomerMenu = () => {
  const firstName = jwt_decode(
    JSON.parse(localStorage.getItem("authTokens"))["access_token"]
  )["firstName"];
  console.log("customer menu", firstName);

  return (
    <div>
      <h1>Hey {firstName}</h1>
    </div>
  );
};

export default CustomerMenu;
