import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./components/Utils/PrivateRoutes";
import { AuthProvider } from "./components/Context/AuthContext";
import NavBar from "./components/Common/NavBar";
import Footer from "./components/Common/Footer";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Home from "./components/Pages/Home";
import Shop from "./components/Pages/Shop";
import Product from "./components/Pages/Product";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout";
import Admin from "./components/Pages/Admin";
import CustomerProfile from "./components/Pages/CustomerProfile";
import CustomerMenu from "./components/Pages/CustomerMenu";

// App.jsx
function App() {
  //-------------------------------------------------------------------------------------
  // States
  //-------------------------------------------------------------------------------------
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [openShopMenu, setOpenShopMenu] = useState(false);
  const [pageBgColor, setPageBgColor] = useState("white");

  //-------------------------------------------------------------------------------------
  // Handlers
  //-------------------------------------------------------------------------------------
  const handleLoginDisplay = () => {
    setShowLogin(!showLogin);
    setShowSignUp(false);
  };

  const handleBgColor = (bgColor) => {
    setPageBgColor(bgColor);
    console.log("background color", pageBgColor);
  };

  //-------------------------------------------------------------------------------------
  // Render
  //-------------------------------------------------------------------------------------
  return (
    <AuthProvider>
      <div className={`flex flex-col h-screen bg-${pageBgColor}`}>
        <div className="flex-grow">
          <NavBar
            showLogin={showLogin}
            handleLoginDisplay={handleLoginDisplay}
            openShopMenu={openShopMenu}
            setOpenShopMenu={setOpenShopMenu}
            handleBgColor={handleBgColor}
          />

          <Login
            showLogin={showLogin}
            setShowLogin={setShowLogin}
            setShowSignUp={setShowSignUp}
          />
          <SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} />

          <div
            className={`container max-w-[320px] sm:max-w-[640px] lg:max-w-[960px] mx-auto `}
          >
            <Routes>
              //---------------------------------------------------------------------
              // Public Routes
              <Route path="/home" element={<Home />}></Route>
              <Route path="/" element={<Shop />}></Route>
              <Route path="/product/:productName" element={<Product />}></Route>
              //---------------------------------------------------------------------
              // Private Routes
              <Route element={<PrivateRoutes />}>
                <Route path="/admin" element={<Admin />}></Route>
                <Route path="/profile" element={<CustomerProfile />}></Route>
                <Route path="/checkout/cart" element={<Cart />}></Route>
                <Route path="/customermenu" element={<CustomerMenu />}></Route>
              </Route>
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
