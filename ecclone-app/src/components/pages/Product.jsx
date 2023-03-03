import React, { useState, useEffect, useReducer } from "react";
import BreadCrumbs from "../Reusables/BreadCrumbs";
import ProductColor from "../Shop/ProductColor";
import ProductSizeBtn from "../Shop/ProductSizeBtn";
import ProductQtyAlert from "../Shop/ProductQtyAlert";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import axios from "axios";

function getImageUrl(name) {
  return new URL(`../../assets/images/${name}.webp`, import.meta.url).href;
}

const dummyProduct = {
  productCode: "th2266",
  productName: "Lailee Knit Camisole",
  mainCat: "Apparel & Accessories",
  subcategory: "Tops",
  currency: "SGD",
  price: "49.00",
  stockOnHand: [
    {
      colorName: "White",
      hexColor: "#ffffff",
      size: "l",
      quantity: "5",
    },
    {
      colorName: "White",
      hexColor: "#ffffff",
      size: "m",
      quantity: "15",
    },
    {
      colorName: "White",
      hexColor: "#ffffff",
      size: "s",
      quantity: "10",
    },
    {
      colorName: "White",
      hexColor: "#ffffff",
      size: "xl",
      quantity: 0,
    },
    {
      colorName: "White",
      hexColor: "#ffffff",
      size: "xs",
      quantity: "10",
    },
    {
      colorName: "Lavender",
      hexColor: "#C49BC9",
      size: "l",
      quantity: "5",
    },
    {
      colorName: "Lavender",
      hexColor: "#C49BC9",
      size: "m",
      quantity: "15",
    },
    {
      colorName: "Lavender",
      hexColor: "#C49BC9",
      size: "s",
      quantity: "10",
    },
    {
      colorName: "Lavender",
      hexColor: "#C49BC9",
      size: "xl",
      quantity: "0",
    },
    {
      colorName: "Lavender",
      hexColor: "#C49BC9",
      size: "xs",
      quantity: "10",
    },
    {
      colorName: "Black",
      hexColor: "#000000",
      size: "l",
      quantity: "5",
    },
    {
      colorName: "Black",
      hexColor: "#000000",
      size: "m",
      quantity: "15",
    },
    {
      colorName: "Black",
      hexColor: "#000000",
      size: "s",
      quantity: "10",
    },
    {
      colorName: "Black",
      hexColor: "#000000",
      size: "xl",
      quantity: "0",
    },
    {
      colorName: "Black",
      hexColor: "#000000",
      size: "xs",
      quantity: "10",
    },
  ],
  images: [
    {
      colorName: "White",
      hexColor: "#ffffff",
      imgArray: [
        "th2266-031_fyyylr0ycoqbssr8",
        "th2266-031-1_t7memjuyxjemusvq",
        "th2266-031-2_ffbh9wzxzgzubxvf",
        "th2266-031-3_nd7m0pppalnkxomk",
        "th2266-031-4_vrxg6wxxhmmqrqb9",
        "th2266-031-5_y6sh53eab5uyoe1n",
        "th2266-031-6_kayi7jrcx109znaw",
      ],
    },
    {
      colorName: "Black",
      hexColor: "#000000",
      imgArray: [
        "th2266-014_ye9w5e8gt4jyiqxk",
        "th2266-014-1_wfyey4yh0kjst8fp",
        "th2266-014-2_kqncryvedokdnwst",
        "th2266-014-3_xefzzxopec3aujk3",
        "th2266-014-4_qtujkdabrchjwdfa",
      ],
    },
    {
      colorName: "Lavender",
      hexColor: "#C49BC9",
      imgArray: [
        "th2266-030_aqz1qvchsrr0basj",
        "th2266-030-1_xr32layt7jhvj8sb",
        "th2266-030-2_py6ww3jlcezonka2",
        "th2266-030-3_ray4esf52ci2ooqt",
        "th2266-030-4_8jzskbowchsmdijy",
        "th2266-030-5_gqltm015ahoybvh0",
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
  return {
    ...newOptionState,
    onHand: parseInt(onHandQty),
    imgArray: imageDisplay,
  };
};

//////////////////
// COMPONENT
//////////////////
const Product = () => {
  useEffect(() => {
    axios
      .post("http://127.0.0.1:5005/product/:name", { productCode: "th1849" })
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err));
  }, []);

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
          quantity: parseInt(currentLine.quantity),
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
        <div className="h-fit sticky top-0">
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
            <p className="mb-1">Size: </p>
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
