import React from "react";

const ProductColor = ({ quantity, hexColor }) => {
  return (
    <div className="relative">
      <div
        className={`w-2.5 h-2.5 rounded-full border-[1px] border-fontDarkGrey cursor-pointer ${
          quantity === 0
            ? "after:block after:absolute after:top-1/2 after:left-1/2 after:rotate-45 after:origin-center after:-translate-x-1/2 after:-translate-y-1/2 after:border-[1px] after:h-2.5 after:bg-white"
            : ""
        } `}
        style={{ background: `${hexColor}` }}
      ></div>
    </div>
  );
};

export default ProductColor;
