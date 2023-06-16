import { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PrivateRoutes from "./components/Utils/PrivateRoutes";
import AuthContext from "./components/Context/AuthContext";
import DataContext from "./components/Context/DataContext";
import axios from "axios";
// Import Components
import AppRoutes from "./components/Routes/AppRoutes";

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
    console.log("App - Page Refresh", pageRefresh);
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
      <AppRoutes></AppRoutes>
    </DataContext.Provider>
  );
}

export default App;
