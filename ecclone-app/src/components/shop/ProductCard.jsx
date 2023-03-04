import React, { useState } from "react";
import ProductColor from "./ProductColor";

function getImageUrl(name) {
  return new URL(`../../assets/images/${name}.webp`, import.meta.url).href;
}

const ProductCard = ({
  subcategory,
  productCode,
  productName,
  currency,
  price,
  images,
  colors,
  navigateToProduct,
}) => {
  const [imageDisplay, setImageDisplay] = useState("main_display");

  return (
    <div
      className="cursor-pointer"
      onClick={() => navigateToProduct(productName)}
    >
      <img
        src={`${getImageUrl(images[imageDisplay])}`}
        className="w-full aspect-auto"
        onMouseEnter={() => setImageDisplay("hover_display")}
        onMouseLeave={() => setImageDisplay("main_display")}
      ></img>
      <div className="text-xxs pt-4">
        {/* product category */}
        <p className="tracking-widest text-fontExtraLightGrey uppercase pb-0.5">
          {subcategory}
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
