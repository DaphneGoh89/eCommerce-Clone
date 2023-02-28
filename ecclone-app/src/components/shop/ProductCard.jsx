import React from "react";

const ProductCard = ({
  category,
  product_code,
  product_name,
  currency,
  price,
  images,
  product_colors,
}) => {
  let colors = ["#000000", "#ffffff", "#fea9cb"];
  return (
    <div className="">
      <img
        src={`src/assets/images/hy5532-014_msousv0o9urzhxyh.webp`}
        className="w-full aspect-auto"
      ></img>
      <div className="text-xxs pt-4">
        {/* product category */}
        <p className="tracking-widest text-fontExtraLightGrey pb-0.5">PANTS</p>
        {/* product name */}
        <p className="pb-2">Christal Shoulder Padded Blazer</p>
        {/* product price */}
        <p className="pb-2">S$ 35.00</p>
        {/* product colors */}
        <div className="flex flex-row space-x-3">
          {colors.map((color, index) => {
            return (
              <div
                key={index}
                className={`w-2.5 h-2.5 rounded-full border-[1px] border-fontDarkGrey cursor-pointer`}
                style={{ background: `${color}` }}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
