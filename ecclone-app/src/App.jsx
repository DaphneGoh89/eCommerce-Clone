import { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoutes from "./components/Utils/PrivateRoutes";
import AuthContext from "./components/Context/AuthContext";
import DataContext from "./components/Context/DataContext";
import axios from "axios";
// Import Components
import NavBar from "./components/Common/NavBar";
import Footer from "./components/Common/Footer";
import Login from "./components/Pages/Login";
import SignUp from "./components/Pages/SignUp";
import LoginWSignup from "./components/Pages/LoginWSignup";
import Home from "./components/Pages/Home";
import Shop from "./components/Pages/Shop";
import Product from "./components/Pages/Product";
import Cart from "./components/Pages/Cart";
import Checkout from "./components/Pages/Checkout";
import ManageOrders from "./components/Pages/AdminPages/ManageOrders";

// App.jsx
function App() {
  //-------------------------------------------------------------------------------------
  // States
  //-------------------------------------------------------------------------------------
  const { userId: customerId, authToken } = useContext(AuthContext);
  const [customerCart, setCustomerCart] = useState(
    localStorage.getItem("lbCart")
      ? JSON.parse(localStorage.getItem("lbCart"))
      : []
  );
  const [pageRefresh, setPageRefresh] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [openShopMenu, setOpenShopMenu] = useState(false);
  const [pageBgColor, setPageBgColor] = useState("white");
  const location = useLocation();
  let currentPath = location.pathname;
  let gstPercent = 8;

  //-------------------------------------------------------------------------------------
  // useEffect - automatically fetched from customer cart based on access token available in localStorage
  //-------------------------------------------------------------------------------------
  useEffect(() => {
    // Get customer cart upon login
    let getCustomerCart = async (customerId) => {
      try {
        // Transfer from localStorage to customer cart upon login
        if (localStorage.getItem("lbCart")) {
          let transferStorageResponse = await axios.put(
            "http://127.0.0.1:5005/cart/addMultiple",
            {
              customerId: customerId,
              cartItems: customerCart,
            },
            { Authorization: `Bearer ${authToken["access_token"]}` }
          );

          if (transferStorageResponse.status === 200) {
            localStorage.removeItem("lbCart");
          }
        }

        // Get customer cart upon login
        let response = await axios.post("http://127.0.0.1:5005/cart/getCart", {
          customerId: customerId,
        });

        if (response.status === 200) {
          let data = response.data;
          setCustomerCart(data);
        } else {
          alert(response.statusText);
        }
      } catch (error) {
        console.log("Error", error.message);
      }
    };
    if (customerId) {
      getCustomerCart(customerId);
    }
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
    //---------------------------------------------------------------------
    // Data Context
    <DataContext.Provider
      value={{
        pageRefresh: pageRefresh,
        setPageRefresh: setPageRefresh,
        customerCart: customerCart,
        setCustomerCart: setCustomerCart,
        cartSubTotal: cartSubTotal,
        cartGstAmount: cartGstAmount,
      }}
    >
      <div
        className={`flex flex-col h-screen bg-${
          currentPath.includes("login")
            ? "bgLightPink"
            : currentPath.includes("checkout")
            ? "bgLightGreen"
            : currentPath.includes("admin")
            ? "[#E7E5E4]"
            : pageBgColor
        }`}
      >
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
            className={`${
              currentPath.includes("admin")
                ? ""
                : "container max-w-[320px] sm:max-w-[640px] lg:max-w-[960px] mx-auto "
            }`}
          >
            <Routes>
              //---------------------------------------------------------------------
              // Public Routes
              <Route path="/home" element={<Home />}></Route> // WIP
              <Route path="/login" element={<LoginWSignup />}></Route>
              <Route path="/" element={<Shop />}></Route>
              <Route path="/product/:productName" element={<Product />}></Route>
              //---------------------------------------------------------------------
              // Private Routes
              <Route element={<PrivateRoutes />}>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/cart/checkout" element={<Checkout />}></Route>
                <Route
                  path="/admin/manageorder"
                  element={<ManageOrders />}
                ></Route>
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
