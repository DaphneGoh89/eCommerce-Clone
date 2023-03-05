import React from "react";

function getImageUrl(name) {
  return new URL(`../../assets/images/${name}.webp`, import.meta.url).href;
}

const ProductCart = ({
  productCode,
  productName,
  productColor,
  colorName,
  productSize,
  currency,
  productPrice,
  quantity,
  mainDisplay,
  handleDelete,
}) => {
  //------------------------------------------------------------------------
  // Handler
  const handleQuantityChange = () => {};

  //------------------------------------------------------------------------
  // Render
  return (
    <>
      <div className="text-xxs flex flex-row space-x-3 pt-4 border-t-[1px]">
        {/* ------------------------------------------ Image Display ------------------------------------------- */}
        <img src={getImageUrl(mainDisplay)} className="w-28 aspect-auto"></img>

        {/* ------------------------------------------ Product Info ------------------------------------------- */}
        <div className="flex-grow flex flex-row justify-between items-start space-x-3">
          <div className="flex-grow md:flex md:flex-row md:justify-between">
            <div className="capitalize md:flex-grow sm:w-full">
              <p>{productName}</p>
              <p className="mb-2">
                {colorName} / {productSize}
              </p>
            </div>
            <div className="md:flex md:flex-row md:space-x-3">
              <p className="mb-2 md:py-1.5">S${productPrice}</p>

              {/* ------------------------------------------ Quantity Selection ------------------------------------------- */}
              <select
                id="quantity"
                name="quantity"
                data-te-select-init
                value={quantity}
                onChange={handleQuantityChange}
                className="border-[1px] border-fontExtraLightGrey/50 bg-transparent w-14 sm:h-fit py-0.5 rounded-sm text-center focus:outline-none"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          {/* ------------------------------------------ Total Product Price ------------------------------------------- */}
          <p className="md:py-1">
            S${" "}
            {(
              (Math.round(parseFloat(quantity) * parseFloat(productPrice)) *
                100) /
              100
            ).toFixed(2)}
          </p>
        </div>
      </div>

      {/* ------------------------------------------ Update Cart ------------------------------------------- */}
      <div className="text-xxxs flex flex-row justify-end space-x-3 my-2">
        <p>Edit</p>
        <p
          className="cursor-pointer"
          onClick={(e) =>
            handleDelete(e, productCode, productName, productColor, productSize)
          }
        >
          Remove
        </p>
      </div>
    </>
  );
};

export default ProductCart;
