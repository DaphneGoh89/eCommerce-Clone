import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // Rest operator takes in the path, element parameter from the parent

  console.log("Private routes here!");

  let { authToken } = useContext(AuthContext);

  return authToken ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
