import React from "react";
import { submenu } from "./dummyData";
import ShopSubMenu from "./ShopSubMenu";

const ShopMenu = () => {
  const categories = Object.keys(submenu);

  return (
    <div className="text-xxs flex flex-col md:flex-row md:space-x-10 text-left divide-y-[1px] md:divide-y-0">
      {categories.map((category, index) => {
        return (
          <ShopSubMenu
            mainCat={category}
            subCats={submenu[category]}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ShopMenu;
