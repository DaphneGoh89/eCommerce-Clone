import React, { useState, useEffect, useReducer, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import DataContext from "../Context/DataContext";
import { useAxios } from "../CustomHooks/useAxios";
import BreadCrumbs from "../Reusables/BreadCrumbs";
import ProductColor from "../Shop/ProductColor";
import ProductSizeBtn from "../Shop/ProductSizeBtn";
import ProductQtyAlert from "../Shop/ProductQtyAlert";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { MdOutlineFavoriteBorder } from "react-icons/md";

//--------------------------------------------------------------------------------------------------------
// Function required for displaying images saved in Assets folder
//--------------------------------------------------------------------------------------------------------
function getImageUrl(name) {
  return new URL(`../../assets/images/${name}.webp`, import.meta.url).href;
}

//--------------------------------------------------------------------------------------------------------
// Check if variable is object
//--------------------------------------------------------------------------------------------------------
function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

//--------------------------------------------------------------------------------------------------------
const Product = () => {
  //------------------------------------------------------------------------------------------------------
  // States & Hooks
  //------------------------------------------------------------------------------------------------------
  const { data, actionResponse, loading, error, fetchData } = useAxios();
  const param = useParams();
  const location = useLocation();
  const {
    formState,
    productCode,
    hexColor: cartHexColor,
    productSize: cartProductSize,
    quantity: cartQuantity,
  } = location.state;
  // console.log("Product Page", location.state);
  const { user, userId: customerId } = useContext(AuthContext);
  const { pageRefresh, setPageRefresh } = useContext(DataContext);

  const [quantityByColor, setQuantityByColor] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [addToCart, setAddToCart] = useState(false);
  const [editCart, setEditCart] = useState(false);
  const [selectedQty, setSelectedQty] = useState(
    formState === "edit" ? cartQuantity : 1
  );

  //--------------------------------------------------------------------------------------------------------
  // Reducer fx - For updating 'optionState' when a new option is selected
  //--------------------------------------------------------------------------------------------------------
  const reducer = (optionState, action) => {
    let newOptionState = { ...optionState, ...action.payload };

    // 1. Find color name for display
    let newColorName = data?.stockOnHand?.find(
      (item) => item.hexColor === newOptionState.hexColor
    )?.colorName;

    // 2. Find all sizes associated with color option
    let newSizeOption = data?.stockOnHand?.filter(
      (item) => item.hexColor === newOptionState.hexColor
    );
    setProductSizes(newSizeOption);

    // 3. Find onHand quantity of option selected
    let onHandQty = data?.stockOnHand?.find(
      (item) =>
        item.hexColor === newOptionState.hexColor &&
        item.size === newOptionState.size
    )?.quantity;

    // 4. Find images to display based on option selected
    let imageDisplay = data?.images?.find(
      (item) => item.hexColor === newOptionState.hexColor
    )?.imgArray;

    //----------------------------------------------------
    return {
      ...newOptionState,
      color: newOptionState.hexColor,
      colorName: newColorName,
      size: newOptionState.size,
      onHand: parseInt(onHandQty),
      imgArray: imageDisplay,
    };
  };

  // useReducer - optionState
  const [optionState, dispatchOptionState] = useReducer(reducer, {
    hexColor: "",
    colorName: "",
    size: "",
    onHand: 0,
    imgArray: [],
  });

  console.log("Product option state", optionState);
  console.log("Product size", productSizes);

  //--------------------------------------------------------------------------------------------------------
  // useEffect
  // - [] : fetch product information from server on page loading
  // - [data] : Process data after fetch
  // - [addToCart] : call 'cart/add' endpoint when user click on 'Add To Bag' button
  //--------------------------------------------------------------------------------------------------------
  useEffect(() => {
    let endpoint = `/product/${param.productName}`;

    let requestOptions = {
      method: "POST",
      data: { productCode: productCode },
    };
    fetchData(endpoint, requestOptions);
  }, []);

  useEffect(() => {
    //----------------------------------------------------------------------------------------------
    // If condition - added to prevent execution of code on first render where data is empty array
    if (isObject(data) && Object.keys(data).length > 0) {
      //----------------------------------------------------------------------
      // Select the first color option on page load
      dispatchOptionState({
        payload: {
          hexColor:
            formState === "edit" ? cartHexColor : data?.stockOnHand[0].hexColor,
          size:
            formState === "edit" ? cartProductSize : data?.stockOnHand[0].size,
        },
      });

      //----------------------------------------------------------------------
      // Calculate onHand quantity by color
      let productQtyByColor = data.stockOnHand.reduce(
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

      setQuantityByColor(productQtyByColor);
    }
  }, [data]);

  //-------------------------------------------------------------------------------------------------------------------
  useEffect(() => {
    // Call addToCart API if formState is "new"
    if (addToCart) {
      let endpoint = `/cart/add`;
      let cartData = {
        customerId: customerId,
        productCode: productCode,
        productName: data?.productName,
        productColor: optionState.hexColor,
        productSize: optionState.size,
        quantity: selectedQty,
      };
      let requestOptions = {
        method: "PUT",
        data: { ...cartData },
      };
      // Execute fetch addToCart endpoint
      fetchData(endpoint, requestOptions);
      console.log("Product AddToCart Action Response", actionResponse);
      // Refresh cart and reinstate state
      setPageRefresh(!pageRefresh);
      setAddToCart(false);
    }
    // Call editCart API if formState is "edit"
    else if (editCart) {
      let editEndpoint = `/cart/edit`;
      let editCartData = {
        customerId: customerId,
        productCode: productCode,
        productName: data?.productName,
        oldProductColor: cartHexColor,
        oldProductSize: cartProductSize,
        oldQuantity: cartQuantity,
        newProductColor: optionState.hexColor,
        newProductSize: optionState.size,
        newQuantity: selectedQty,
      };
      let requestOptions = {
        method: "PUT",
        data: { ...editCartData },
      };
      // Execute fetch editCart endpoint
      fetchData(editEndpoint, requestOptions);
      console.log("Product EditCart Action Response", actionResponse);
      // Refresh cart and reinstate state
      setPageRefresh(!pageRefresh);
      setEditCart(false);
    }
  }, [addToCart, editCart]);

  //-------------------------------------------------------------------------------------------------------------------
  // Handlers
  const handleQtyChange = (e) => {
    setSelectedQty(e.target.value);
  };

  const handleAddToCart = () => {
    setAddToCart(true);
  };

  const handleEditCart = () => {
    setEditCart(true);
  };

  //-------------------------------------------------------------------------------------------------------------------
  return (
    <div>
      {/* Breadcrumbs */}
      {!loading && Object.keys(data).length > 0 && (
        <>
          <BreadCrumbs />
          <div className="grid grid-cols-3 gap-10">
            {/* Product images */}
            <div className="col-span-2 grid grid-cols-2 gap-3">
              {optionState.imgArray.length > 0 &&
                optionState.imgArray.map((image, index) => {
                  return (
                    <div key={index}>
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
                {data?.productName}
              </h1>

              {/* Price display */}
              <p className="font-bold text-xs mb-5">
                S$ {(Math.round(data?.price * 100) / 100).toFixed(2)}
              </p>
              {/* Color name display */}
              <p className="text-xxs mb-1">
                Color:{" "}
                <span className="capitalize ml-1.5 text-fontExtraLightGrey">
                  {optionState.colorName}
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
                  optionState.onHand <= 0 ? "hidden" : ""
                }`}
              >
                <label htmlFor="quantity" className="mr-4">
                  Quantity:
                </label>
                <select
                  id="quantity"
                  name="quantity"
                  data-te-select-init
                  value={selectedQty}
                  onChange={handleQtyChange}
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
                <ButtonSubmit
                  btnText={formState === "edit" ? "EDIT BAG" : "ADD TO BAG"}
                  handleClick={
                    formState === "edit" ? handleEditCart : handleAddToCart
                  }
                  disabled={optionState.onHand <= 0}
                />
                <button className="border-[1px] border-fontExtraLightGrey rounded px-3">
                  <MdOutlineFavoriteBorder />
                </button>
              </div>

              {/* Add To Cart Alert */}
              <div className="mt-9">
                <p
                  className={`text-xxs py-3 px-3 ${
                    actionResponse === null
                      ? "hidden"
                      : actionResponse?.status === "Success"
                      ? "bg-alertInfoBg text-alertInfoFont"
                      : "bg-alertPinkInfoBg text-alertWarningFont"
                  }`}
                >
                  {actionResponse?.message}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
