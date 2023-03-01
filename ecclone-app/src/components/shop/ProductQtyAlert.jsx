import React from "react";

const ProductQtyAlert = ({ quantity }) => {
  console.log("quantity", quantity);
  return (
    <div className={`text-xxxs ${quantity === undefined ? "hidden" : ""}`}>
      <p
        className={`w-fit rounded-sm px-2 py-1 mb-3 ${
          quantity === 0
            ? "bg-alertOOSBg text-alertOOSFont"
            : quantity <= 10
            ? "bg-alertWarningBg text-alertWarningFont"
            : "bg-alertInfoBg text-alertInfoFont"
        }`}
      >
        {quantity === 0
          ? "OUT OF STOCK"
          : quantity <= 10
          ? "LAST FEW PIECES"
          : "IN STOCK"}
      </p>
      <div
        className={`flex flex-row flex-wrap items-center bg-alertPinkInfoBg w-fit rounded-sm px-2 py-1 mb-3 ${
          quantity !== 0 ? "hidden" : ""
        }`}
      >
        <p
          className={`text-white font-bold text-center leading-3 bg-btnTealGreen w-3 h-3 rounded-full mr-2`}
        >
          i
        </p>
        <p className={` text-btnTealGreen`}>
          Select a colour and size. We'll email you when it's available!
        </p>
      </div>
    </div>
  );
};

export default ProductQtyAlert;
