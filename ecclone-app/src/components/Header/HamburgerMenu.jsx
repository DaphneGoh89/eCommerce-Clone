import React from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import ShopMenu from "../Common/ShopMenu";

const HamburgerMenu = ({ openShopMenu }) => {
  return (
    <div className="group">
      <button className="block md:hidden py-4 px-8">
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
            <Link to="/">
              <div
                className="font-playfair text-fontHeaderBlack text-left text-xl font-bold"
                onClick={() => setOpenShopMenu(!openShopMenu)}
              >
                Love Bonito
              </div>
            </Link>
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
  );
};

export default HamburgerMenu;
