import React from "react";

function getImageUrl(name) {
  return new URL(`../../assets/images/${name}.webp`, import.meta.url).href;
}

const CheckoutProductCart = ({
  productCode,
  productName,
  productColor,
  colorName,
  hexColor,
  productSize,
  currency,
  productPrice,
  quantity,
  onHandQty,
  mainDisplay,
  handleDelete,
}) => {
  return (
    <div className="text-xxs grid grid-cols-4 gap-2 mb-4 border-b-[1px]">
      <img src={getImageUrl(mainDisplay)} className={`w-28 aspect-auto `}></img>
      <div className="col-span-2">
        <p>{productName}</p>
        <p>
          {colorName} / <span className="uppercase">{productSize}</span>
        </p>
        <p>Qty: {quantity}</p>
      </div>
      <p className="text-right">
        S${" "}
        {(
          (Math.round(parseFloat(quantity) * parseFloat(productPrice)) * 100) /
          100
        ).toFixed(2)}
      </p>
    </div>
  );
};

export default CheckoutProductCart;
