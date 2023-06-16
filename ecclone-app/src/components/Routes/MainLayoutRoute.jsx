import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import { Outlet, useLocation } from "react-router";

const MainLayoutRoute = () => {
  const location = useLocation();
  let currentPath = location.pathname;

  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [openShopMenu, setOpenShopMenu] = useState(false);
  const handleLoginDisplay = () => {
    setShowLogin(!showLogin);
    setShowSignUp(false);
  };

  const handleBgColor = (bgColor) => {
    setPageBgColor(bgColor);
  };

  return (
    <>
      {/* Navigation Bar */}
      <Header
        showLogin={showLogin}
        handleLoginDisplay={handleLoginDisplay}
        openShopMenu={openShopMenu}
        setOpenShopMenu={setOpenShopMenu}
        handleBgColor={handleBgColor}
      ></Header>

      {/* Show Login Modal */}
      <div
        className={`right-modal ${
          showLogin ? "-translate-x-50" : "translate-x-full"
        }`}
      >
        <Login setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />
      </div>

      {/* Show SignUp Modal */}
      <div
        className={`right-modal ${
          showSignUp ? "-translate-x-50" : "translate-x-full"
        }`}
      >
        <SignUp setShowSignUp={setShowSignUp} />
      </div>

      {/* Main Content */}
      <div
        className={`${
          currentPath.includes("admin")
            ? ""
            : "container max-w-[320px] sm:max-w-[640px] lg:max-w-[960px] mx-auto "
        }`}
      >
        <Outlet></Outlet>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </>
  );
};

export default MainLayoutRoute;
