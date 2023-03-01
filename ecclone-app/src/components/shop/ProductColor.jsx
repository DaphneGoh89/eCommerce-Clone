import React from "react";

const ProductColor = ({
  quantity,
  hexColor,
  index,
  colorSelected,
  dispatchOptionState,
}) => {
  const handleClick = (hexColor) => {
    dispatchOptionState({ payload: { hexColor: hexColor } });
  };
  return (
    <div className="relative" onClick={() => handleClick(hexColor)}>
      <div
        role="button"
        className={`w-2.5 h-2.5 rounded-full border-[1px] border-fontExtraLightGrey cursor-pointer ${
          quantity === 0
            ? "cursor-not-allowed opacity-60 after:block after:absolute after:top-1/2 after:left-1/2 after:rotate-45 after:origin-center after:-translate-x-1/2 after:-translate-y-1/2 after:border-[0.5px] after:h-2.5 after:bg-white"
            : ""
        } ${
          colorSelected === hexColor
            ? "ring-1 ring-offset-2 ring-slate-900"
            : ""
        }`}
        style={{ background: `${hexColor}` }}
        disabled={quantity === 0}
      ></div>
    </div>
  );
};

export default ProductColor;
