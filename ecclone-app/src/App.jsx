import { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoutes from "./components/Utils/PrivateRoutes";
import AuthContext from "./components/Context/AuthContext";
import DataContext from "./components/Context/DataContext";
import axios from "axios";
// Import Components
import NavBar from "./components/Common/NavBar";
import Footer from "./components/Common/Footer";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import Home from "./components/Pages/Home";
import Shop from "./components/Pages/Shop";
import Product from "./components/Pages/Product";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout";
import CustomerMenu from "./components/Pages/CustomerMenu";

// App.jsx
function App() {
  //-------------------------------------------------------------------------------------
  // States
  //-------------------------------------------------------------------------------------
  const { userId: customerId } = useContext(AuthContext);
  const [customerCart, setCustomerCart] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [openShopMenu, setOpenShopMenu] = useState(false);
  const [pageBgColor, setPageBgColor] = useState("white");
  let gstPercent = 8;
  console.log("App", customerId);

  //-------------------------------------------------------------------------------------
  // useEffect - automatically fetched from customer cart based on access token available in localStorage
  //-------------------------------------------------------------------------------------
  useEffect(() => {
    let getCustomerCart = async (customerId) => {
      try {
        let response = await axios.post("http://127.0.0.1:5005/cart/getCart", {
          customerId: customerId,
        });

        if (response.status === 200) {
          let data = response.data;
          setCustomerCart(data);
          console.log("customer cart", customerCart);
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        console.log("Error", error.message);
      }
    };

    getCustomerCart(customerId);
  }, [customerId, pageRefresh]);

  //--------------------------------------------------------------------------------------------------------
  // Calculate Cart Total
  const cartSubTotal = customerCart.reduce((subTotal, item) => {
    return subTotal + parseFloat(item.productPrice) * parseFloat(item.quantity);
  }, 0);

  const cartGstAmount =
    (cartSubTotal / (1 + gstPercent / 100)) * (gstPercent / 100);

  //-------------------------------------------------------------------------------------
  // Handlers
  //-------------------------------------------------------------------------------------
  const handleLoginDisplay = () => {
    setShowLogin(!showLogin);
    setShowSignUp(false);
  };

  const handleBgColor = (bgColor) => {
    setPageBgColor(bgColor);
  };

  //-------------------------------------------------------------------------------------
  // Render
  //-------------------------------------------------------------------------------------
  return (
    <DataContext.Provider
      value={{
        pageRefresh: pageRefresh,
        setPageRefresh: setPageRefresh,
        customerCart: customerCart,
        cartSubTotal: cartSubTotal,
        cartGstAmount: cartGstAmount,
      }}
    >
      <div className={`flex flex-col h-screen bg-${pageBgColor}`}>
        <div className="flex-grow">
          <NavBar
            showLogin={showLogin}
            handleLoginDisplay={handleLoginDisplay}
            openShopMenu={openShopMenu}
            setOpenShopMenu={setOpenShopMenu}
            handleBgColor={handleBgColor}
            customerCart={customerCart}
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
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/cart/checkout" element={<Checkout />}></Route>
                <Route path="/customermenu" element={<CustomerMenu />}></Route>
              </Route>
            </Routes>
          </div>
        </div>

        <Footer />
      </div>
    </DataContext.Provider>
  );
}

export default App;
