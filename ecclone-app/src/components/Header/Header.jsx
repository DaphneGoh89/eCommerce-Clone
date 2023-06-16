import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "./HamburgerMenu";
import ShopMenu from "../Common/ShopMenu";
import { AiOutlineUser, AiOutlineShopping } from "react-icons/ai";
import { MdOutlineFavoriteBorder } from "react-icons/md";

const Header = ({
  showLogin,
  handleLoginDisplay,
  openShopMenu,
  setOpenShopMenu,
  handleBgColor,
  customerCart,
}) => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== undefined) {
      // Scroll down
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        // Scroll up
        setShow(true);
      }
      // Set current position as last position
      setLastScrollY(window.scrollY);
    }
  };

  // useEffect for scroll event to show and hide navbar
  useEffect(() => {
    if (typeof window !== undefined) {
      window.addEventListener("scroll", controlNavbar);
    }

    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <header>
      <nav
        className={`z-50 flex justify-between bg-bgLightPink text-xs active-navbar ${
          !show && "-top-40"
        }`}
      >
        {/* ----------------------------------------- NAV - Home / Shop ----------------------------------------------- */}
        <div className="hidden w-full md:block md:w-auto">
          <div className="flex flex-row items-center space-x-4 px-10 py-5 cursor-pointer">
            {/* ---------- Home menu ---------- */}
            <Link to="/" className="link-underline-animation">
              HOME
            </Link>
            {/* ------------ Shop menu ------------ */}
            <div
              className="group"
              onMouseEnter={() => setOpenShopMenu(!openShopMenu)}
              onMouseLeave={() => setOpenShopMenu(!openShopMenu)}
            >
              <Link
                to="/"
                className="link-underline-animation"
                onClick={() => setOpenShopMenu(true)}
              >
                SHOP
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
        <HamburgerMenu openShopMenu={openShopMenu}></HamburgerMenu>
        {/* --------------------------------------------------- NAV - Login / Cart -----------------------------------------------*/}
        <div>
          <div className="flex flex-row items-start space-x-4 px-8 py-3 cursor-pointer text-xl font-extralight">
            {/* --------------- Customer's Favorites --------------------- */}
            <Link to="/favorites" className={`navbar-icon-highlight`}>
              <MdOutlineFavoriteBorder />
            </Link>
            {/* --------------- User login --------------------- */}
            <button
              className={`navbar-icon-highlight ${
                showLogin ? "bg-bgPink" : ""
              }`}
              onClick={handleLoginDisplay}
            >
              <AiOutlineUser />
            </button>
            {/* ------------------- Shopping cart --------------------- */}
            <Link to="/cart" className={`relative navbar-icon-highlight`}>
              <AiOutlineShopping />
              <div
                className={`text-xxxs text-center leading-4 block absolute top-0 -right-1 w-4 h-4 rounded-full bg-bgFooterPink ${
                  customerCart?.length > 0 ? "block" : "hidden"
                }`}
              >
                {customerCart?.length}
              </div>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
