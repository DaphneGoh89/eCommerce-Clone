import React from "react";
import BreadCrumbs from "../reusables/BreadCrumbs";
import ProductColor from "../shop/ProductColor";

const dummyProduct = {
  productCode: "LN1278",
  productName: "Galilea A-line Pleat Dress",
  currency: "SGD",
  price: 55.5,
  stockOnHand: [
    { colorName: "black", hexColor: "#fea9cb", size: "xs", quantity: 10 },
    { colorName: "white", hexColor: "#000000", size: "s", quantity: 20 },
  ],
};
const Product = () => {
  const { productCode, productName, currency, price, stockOnHand } =
    dummyProduct;

  return (
    <div>
      <BreadCrumbs />
      <div>Product Image</div>
      <div>
        <h1 className="font-playfair font-bold text-xl tracking-wide">
          {productName}
        </h1>
        <p>S$ {(Math.round(price * 100) / 100).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Product;
