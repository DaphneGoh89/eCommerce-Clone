import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/common/NavBar";
import Footer from "./components/common/Footer";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import Home from "./components/pages/Home";
import Shop from "./components/pages/Shop";
import Product from "./components/pages/Product";
import { useAxios } from "./components/customHooks/useAxios";

function App() {
  /////////
  // States
  /////////
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [openShopMenu, setOpenShopMenu] = useState(false);

  //////////
  // test useAxios
  //////////
  const { response, loading, error, fetchData } = useAxios();

  useEffect(() => {
    let axiosParam = {
      method: "GET",
      url: "/user/allUsersNoAuth",
      headers: { "Content-Type": "application/json" },
    };

    fetchData(axiosParam);
  }, []);

  ///////////
  // handlers
  ///////////
  const handleLoginDisplay = () => {
    setShowLogin(!showLogin);
    setShowSignUp(false);
  };

  ///////////
  // return
  ///////////
  return (
    <div className="flex flex-col h-screen">
      <NavBar
        showLogin={showLogin}
        handleLoginDisplay={handleLoginDisplay}
        openShopMenu={openShopMenu}
        setOpenShopMenu={setOpenShopMenu}
      />
      {/* <div className="flex-grow"> */}
      {/* {openShopMenu && <ShopMenu />} */}
      <Login
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        setShowSignUp={setShowSignUp}
      />
      <SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
      {/*</div> */}
      <div className="container max-w-[320px] sm:max-w-[640px] lg:max-w-[960px] mx-auto">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/product/:productName" element={<Product />}></Route>
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
