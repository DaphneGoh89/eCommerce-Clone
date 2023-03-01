import React, { useState, useEffect, useReducer } from "react";
import BreadCrumbs from "../reusables/BreadCrumbs";
import ProductColor from "../shop/ProductColor";
import ProductSizeBtn from "../shop/ProductSizeBtn";
import ProductQtyAlert from "../shop/ProductQtyAlert";
import ButtonSubmit from "../reusables/ButtonSubmit";
import { MdOutlineFavoriteBorder } from "react-icons/md";

function getImageUrl(name) {
  return new URL(`../../assets/images/${name}.webp`, import.meta.url).href;
}

const dummyProduct = {
  productCode: "LN1278",
  productName: "Galilea A-line Pleat Dress",
  currency: "SGD",
  price: 55.5,
  stockOnHand: [
    { colorName: "Dusty Pink", hexColor: "#E6D6D9", size: "xs", quantity: 0 },
    { colorName: "Dusty Pink", hexColor: "#E6D6D9", size: "s", quantity: 0 },
    { colorName: "Dusty Pink", hexColor: "#E6D6D9", size: "m", quantity: 0 },
    { colorName: "Dusty Pink", hexColor: "#E6D6D9", size: "l", quantity: 0 },
    { colorName: "Dusty Pink", hexColor: "#E6D6D9", size: "xl", quantity: 0 },
    { colorName: "White", hexColor: "#FFFFFF", size: "xs", quantity: 0 },
    { colorName: "White", hexColor: "#FFFFFF", size: "s", quantity: 0 },
    { colorName: "White", hexColor: "#FFFFFF", size: "M", quantity: 0 },
    { colorName: "White", hexColor: "#FFFFFF", size: "l", quantity: 0 },
    { colorName: "White", hexColor: "#FFFFFF", size: "xl", quantity: 0 },
    { colorName: "White", hexColor: "#FFFFFF", size: "xxl", quantity: 0 },
  ],
  images: [
    {
      colorName: "White",
      hexColor: "#FFFFFF",
      imgArray: [
        "ln1278-031_7n5bbpqtvdnrosxo",
        "ln1278-031-1_yyeuiovmdny49cwp",
        "ln1278-031-2_kxlbelixewm7chlj",
        "ln1278-031-3_lyy2pxiextj2z6cs",
        "ln1278-031-4_rtqle2pjrscjydlj",
      ],
    },
    {
      colorName: "Dusty Pink",
      hexColor: "#E6D6D9",
      imgArray: [
        "ln1278-026_xorme3sldvjzu6vu",
        "ln1278-026-1_y4jjc2w9fezcz644",
        "ln1278-026-2_6bhgrhutlikbqvf2",
        "ln1278-026-3_iucomxc1gygzthhu",
        "ln1278-026-4_pgdn7t6lnlbv7saz",
      ],
    },
  ],
};

///////////////////
// Reducer fx - optionState
///////////////////
const reducer = (optionState, action) => {
  let newOptionState = { ...optionState, ...action.payload };
  let onHandQty = dummyProduct.stockOnHand.find(
    (item) =>
      item.hexColor === newOptionState.hexColor &&
      item.size === newOptionState.size
  )?.quantity;
  let imageDisplay = dummyProduct.images.find(
    (item) => item.hexColor === newOptionState.hexColor
  )?.imgArray;
  return { ...newOptionState, onHand: onHandQty, imgArray: imageDisplay };
};

//////////////////
// COMPONENT
//////////////////
const Product = () => {
  ///////////////////
  // destructure data from fetch product API call
  ///////////////////
  const { productCode, productName, currency, price, stockOnHand } =
    dummyProduct;

  ///////////////////
  // reducer state
  ///////////////////
  const [optionState, dispatchOptionState] = useReducer(reducer, {
    hexColor: "#000000",
    size: "xs",
    onHand: 0,
    imgArray: [],
  });
  console.log("optionState", optionState);

  ///////////////////
  // get unique colorName - hexColor dictionary
  ///////////////////
  const productColorSet = new Set();
  dummyProduct.stockOnHand.forEach((item) =>
    productColorSet.add(`${item.colorName}-${item.hexColor}`)
  );

  let productColors = Array.from(productColorSet).map((item) => {
    const data = item.split("-");
    return { colorName: data[0], hexColor: data[1] };
  });

  ///////////////////
  // calculate onHand quantity by color
  ///////////////////
  const quantityByColor = dummyProduct.stockOnHand.reduce(
    (quantityByColor, currentLine) => {
      if (
        quantityByColor.findIndex(
          (element) => element.hexColor === currentLine.hexColor
        ) === -1
      ) {
        quantityByColor.push({
          hexColor: currentLine.hexColor,
          quantity: currentLine.quantity,
        });
      } else {
        let i = quantityByColor.findIndex(
          (element) => element.hexColor === currentLine.hexColor
        );
        quantityByColor[i] = {
          ...quantityByColor[i],
          quantity:
            parseInt(quantityByColor[i].quantity) +
            parseInt(currentLine.quantity),
        };
      }
      return quantityByColor;
    },
    []
  );

  /////////////////////
  // display selected color name
  /////////////////////
  let displayedColorName;

  //   if (colorSelected === null) {
  //     displayedColorName = productColors.find(
  //       (color) => color.hexColor === quantityByColor[0].hexColor
  //     ).colorName;
  //   } else {
  //     displayedColorName = productColors.find(
  //       (color) => color.hexColor === colorSelected
  //     ).colorName;
  //   }

  /////////////////////
  // get all sizes associated with color selected
  /////////////////////
  let productSizes = dummyProduct.stockOnHand.filter(
    (item) => item.hexColor === optionState.hexColor
  );

  /////////////////////
  // Render
  /////////////////////
  return (
    <div>
      {/* Breadcrumbs */}
      <BreadCrumbs />
      <div className="grid grid-cols-3 gap-10">
        {/* Product images */}
        <div className="col-span-2 grid grid-cols-2 gap-3">
          {optionState.imgArray.length > 0 &&
            optionState.imgArray.map((image, index) => {
              return (
                <div>
                  <img
                    className="w-full aspect-auto"
                    src={getImageUrl(image)}
                  ></img>
                </div>
              );
            })}
        </div>

        {/* Product details */}
        <div>
          {/* Product name display */}
          <h1 className="font-playfair font-bold text-xl tracking-wide mb-5">
            {productName}
          </h1>

          {/* Price display */}
          <p className="font-bold text-xs mb-5">
            S$ {(Math.round(price * 100) / 100).toFixed(2)}
          </p>
          {/* Color name display */}
          <p className="text-xxs mb-1">
            Color:{" "}
            <span className="capitalize ml-1.5 text-fontExtraLightGrey">
              {displayedColorName}
            </span>
          </p>

          {/* Color selection display */}
          <div className="flex flex-row space-x-3 mb-5">
            {quantityByColor.map((item, index) => {
              return (
                <ProductColor
                  key={index}
                  {...item}
                  index={index}
                  colorSelected={optionState.hexColor}
                  dispatchOptionState={dispatchOptionState}
                />
              );
            })}
          </div>

          {/* Size selection display */}
          <div className="text-xs mb-5">
            <p className="mb-2">Size: </p>
            <div className="flex flex-wrap">
              {productSizes.map((item, index) => {
                return (
                  <ProductSizeBtn
                    key={index}
                    {...item}
                    sizeSelected={optionState.size}
                    dispatchOptionState={dispatchOptionState}
                  />
                );
              })}
            </div>
          </div>

          {/* Quantity selection */}
          <div
            className={`text-xxs mb-4 ${
              optionState.onHand === 0 ? "hidden" : ""
            }`}
          >
            <label htmlFor="quantity" className="mr-4">
              Quantity:
            </label>
            <select
              id="quantity"
              name="quantity"
              data-te-select-init
              className="border-[1px] border-fontDarkGrey w-20 py-0.5 rounded-sm text-center focus:outline-none"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>

          {/* Alert messages */}
          <ProductQtyAlert quantity={optionState.onHand} />

          {/* Add to cart / mailing list button */}
          <div className="flex flex-row space-x-2">
            <ButtonSubmit btnText="ADD TO BAG" />
            <button className="border-[1px] border-fontExtraLightGrey rounded px-3">
              <MdOutlineFavoriteBorder />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
