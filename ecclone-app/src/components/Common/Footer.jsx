import React, { useState } from "react";
import { footerSubMenu } from "./dummyData";
import FooterSubMenu from "./FooterSubMenu";

const Footer = () => {
  const [showFooterMenu, setShowFooterMenu] = useState(null);
  const categories = Object.keys(footerSubMenu);
  return (
    <>
      <div className="text-xs tracking-wide mt-10 px-10 py-5 flex flex-col mx-auto w-full md:flex-row md:space-x-36 border-b-2 bg-bgFooterPink/75">
        {categories.map((category, index) => {
          return (
            <FooterSubMenu
              heading={category}
              subHeadings={footerSubMenu[category]}
              key={index}
              index={index}
              showFooterMenu={showFooterMenu}
              setShowFooterMenu={setShowFooterMenu}
            />
          );
        })}
      </div>
    </>
  );
};

export default Footer;
