import React from "react";
import { Routes, Route } from "react-router";
import Home from "../Pages/Home";
import LoginWSignup from "../Pages/LoginWSignup";
import Shop from "../Pages/Shop";
import Product from "../Pages/Product";
import PrivateRoutes from "../Utils/PrivateRoutes";
import Favorites from "../Pages/Favorites";
import CartPage from "../Pages/Cart/CartPage";
import Checkout from "../Pages/Checkout";
import ManageOrders from "../Pages/AdminPages/ManageOrders";
import MainLayoutRoute from "./MainLayoutRoute";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        //---------------------------------------------------------------------
        // Public Routes
        <Route path="/" element={<MainLayoutRoute />}>
          <Route path="/home" element={<Home />}></Route> // WIP
          <Route path="/login" element={<LoginWSignup />}></Route>
          <Route path="/" element={<Shop />}></Route>
          <Route path="/product/:productName" element={<Product />}></Route>
        </Route>
        //---------------------------------------------------------------------
        // Private Routes
        <Route element={<PrivateRoutes />}>
          <Route element={<MainLayoutRoute />}>
            <Route path="/favorites" element={<Favorites />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
          </Route>
          <Route path="/cart/checkout" element={<Checkout />}></Route>
          <Route path="/admin/manageorder" element={<ManageOrders />}></Route>
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
