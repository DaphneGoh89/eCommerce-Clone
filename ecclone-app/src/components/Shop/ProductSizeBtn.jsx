import React from "react";

const ProductSizeBtn = ({
  size,
  quantity,
  sizeSelected,
  dispatchOptionState,
}) => {
  const handleClick = (size) => {
    dispatchOptionState({ payload: { size: size } });
  };
  return (
    <div
      className="relative text-xxs mr-2 mb-1"
      onClick={() => handleClick(size)}
    >
      <button
        className={`border-[1px] border-black w-14 h-7 rounded-md uppercase ${
          parseInt(quantity) === 0
            ? "border-gray-300 text-gray-300 cursor-not-allowed after:absolute after:block after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:origin-center after:rotate-[68deg] after:h-[calc(200%)] after:border-[0.5px] after-bg-gray-300"
            : ""
        } ${sizeSelected === size ? "bg-btnTealGreen text-white" : ""}`}
      >
        {size}
      </button>
    </div>
  );
};

export default ProductSizeBtn;
