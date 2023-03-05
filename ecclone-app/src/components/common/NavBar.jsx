import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import ShopMenu from "./ShopMenu";
import AuthContext from "../Context/AuthContext";

const NavBar = ({
  showLogin,
  handleLoginDisplay,
  openShopMenu,
  setOpenShopMenu,
  handleBgColor,
  customerCart,
}) => {
  console.log("Am I re-rendered?", customerCart);

  //-------------------------------------------------------------------------------------------------------------------
  // Render
  return (
    <nav className="relative flex justify-between bg-bgLightPink border-b-[1px] text-xs">
      {/* ----------------------------------------- NAV - Home / Shop ----------------------------------------------- */}
      <div className="hidden w-full md:block md:w-auto">
        <div className="flex flex-row items-center space-x-4 px-10 py-5 cursor-pointer">
          {/* ---------- Home menu ---------- */}
          <Link to="/">
            <button>HOME</button>
          </Link>
          {/* ------------ Shop menu ------------ */}
          <div
            className="group"
            onMouseEnter={() => setOpenShopMenu(!openShopMenu)}
            onMouseLeave={() => setOpenShopMenu(!openShopMenu)}
          >
            <Link to="/">
              <button
                onClick={() => setOpenShopMenu(true)}
                className="hover:border-b-2 hover:border-bgPink"
              >
                SHOP
              </button>
            </Link>
            <div
              className={`flex flex-col opacity-0 bg-white md:flex-row w-full absolute left-0 mt-5 mb-5 px-10 py-5 duration-1000 ease-in-out border-b-2 ${
                openShopMenu
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-[300px]"
              }`}
            >
              <ShopMenu />
            </div>
          </div>
        </div>
      </div>
      {/* ------------------------------------ NAV - HAMBURGER (MOBILE VIEW) ----------------------------------------------- */}
      <div className="group">
        <button className="block md:hidden py-4 px-8 group-hover:bg-amber-200">
          <RxHamburgerMenu
            className="text-lg"
            onClick={() => setOpenShopMenu(!openShopMenu)}
          />
          {/* ---------- Side Menu Animation ---------- */}
          <div
            className={`flex flex-col w-full h-screen bg-bgWhite absolute left-0 top-0 mb-5  duration-1000 ease-in-out border-b-[1px] border-r-[1px] z-10 ${
              openShopMenu ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {/* ----- Logo header with close modal button ----- */}
            <div className="flex flex-row justify-between items-center py-5 px-8 border-b-[1px]">
              <div className="font-playfair text-fontHeaderBlack text-left text-xl font-bold">
                Love Bonito
              </div>
              <div>
                <RxCross1
                  className="cursor-pointer text-lg"
                  onClick={() => setOpenShopMenu(false)}
                />
              </div>
            </div>
            {/* -------- Side Menu -------- */}
            <div className="py-5 px-8 bg-white">
              <ShopMenu />
            </div>
          </div>
        </button>
      </div>
      {/* --------------------------------------------------- NAV - Login / Cart -----------------------------------------------*/}
      <div>
        <div className="flex flex-row items-start space-x-4 px-8 py-3 cursor-pointer text-xl font-extralight">
          {/* --------------- User login --------------------- */}
          <button
            className={`p-1 rounded-full hover:bg-bgPink ${
              showLogin ? "bg-bgPink" : ""
            }`}
            onClick={handleLoginDisplay}
          >
            <AiOutlineUser />
          </button>
          {/* ------------------- Shopping cart --------------------- */}
          <div className="relative">
            <Link to="/checkout/cart">
              <button
                className={`p-1 rounded-full hover:bg-bgPink `}
                // onClick={() => handleBgColor("bgLightPink")}
              >
                <AiOutlineShopping />
                <div
                  className={`text-xxxs text-center leading-4 block absolute top-0 -right-1 w-4 h-4 rounded-full bg-bgFooterPink ${
                    customerCart.length > 0 ? "block" : "hidden"
                  }`}
                >
                  {customerCart.length}
                </div>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
