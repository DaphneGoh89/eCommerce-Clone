import React from "react";

const ShopSubMenu = ({ mainCat, subCats }) => {
  return (
    <ul className="pt-2">
      <li className="text-fontMenuPink mb-2">{mainCat.toUpperCase()}</li>
      {subCats.map((subCat, index) => {
        return (
          <li className="cursor-pointer mb-1.5" key={index}>
            {subCat}
          </li>
        );
      })}
    </ul>
  );
};

export default ShopSubMenu;
