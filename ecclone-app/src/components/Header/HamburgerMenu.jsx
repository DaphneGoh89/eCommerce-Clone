import React from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import ShopMenu from "../Common/ShopMenu";

const HamburgerMenu = ({ openShopMenu, setOpenShopMenu }) => {
  return (
    <div className="group">
      <button className="block md:hidden py-4 px-8">
        <RxHamburgerMenu
          className="text-lg"
          onClick={() => setOpenShopMenu(!openShopMenu)}
        />

        {/* ---------- Side Menu Animation ---------- */}
        <div
          className={`flex flex-col px-8 left-modal ${
            openShopMenu ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* ----- Logo header with close modal button ----- */}
          <div className="flex flex-row justify-between items-center py-5 border-b-[1px]">
            <Link
              to="/"
              className="font-playfair text-fontHeaderBlack text-left text-xl font-bold"
              onClick={() => setOpenShopMenu(!openShopMenu)}
            >
              Love Bonito
            </Link>

            <RxCross1
              className="cursor-pointer text-lg"
              onClick={() => setOpenShopMenu(false)}
            />
          </div>
          {/* -------- Side Menu -------- */}
          <div className="py-5">
            <ShopMenu />
          </div>
        </div>
      </button>
    </div>
  );
};

export default HamburgerMenu;
