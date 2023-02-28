import React, { useState } from "react";
import ProductColor from "./ProductColor";

const ProductCard = ({
  category,
  productCode,
  productName,
  currency,
  price,
  images,
  colors,
  navigateToProduct,
}) => {
  const [imageDisplay, setImageDisplay] = useState("mainDisplay");

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigateToProduct(productName)}
    >
      <img
        src={`${images[imageDisplay]}`}
        className="w-full aspect-auto"
        onMouseEnter={() => setImageDisplay("hoverDisplay")}
        onMouseLeave={() => setImageDisplay("mainDisplay")}
      ></img>
      <div className="text-xxs pt-4">
        {/* product category */}
        <p className="tracking-widest text-fontExtraLightGrey uppercase pb-0.5">
          {category}
        </p>
        {/* product name */}
        <p className="capitalize pb-2">{productName}</p>
        {/* product price */}
        <p className="pb-2">S$ {(Math.round(price * 100) / 100).toFixed(2)}</p>
        {/* product colors */}
        <div className="flex flex-row space-x-3 mb-4">
          {colors.map((color, index) => {
            return (
              <ProductColor
                key={index}
                quantity={color.quantity}
                hexColor={color.hexColor}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
