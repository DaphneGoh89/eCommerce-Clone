import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import {
  getCartAsync,
  removeFromCartAsync,
} from "../../ReduxStore/CartReducer";

function getImageUrl(name) {
  return new URL(`../../../assets/images/${name}.webp`, import.meta.url).href;
}

const CartItem = ({
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
  customerId,
}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let checkoutPage = location.pathname.includes("checkout");

  // onEdit: navigate to product page
  const navigateToProduct = (
    productName,
    productCode,
    colorName,
    hexColor,
    productSize,
    quantity
  ) => {
    navigate(`/product/${productName}`, {
      state: {
        productCode,
        colorName,
        hexColor,
        productSize,
        quantity,
        formState: "edit",
      },
    });
  };

  // remove item from cart
  const handleDelete = (
    e,
    productCode,
    productName,
    productColor,
    productSize
  ) => {
    dispatch(
      removeFromCartAsync({
        customerId,
        productCode,
        productName,
        productColor,
        productSize,
      })
    ).then(() => dispatch(getCartAsync(customerId)));
  };

  //------------------------------------------------------------------------
  // Handler
  const handleQuantityChange = () => {};

  //------------------------------------------------------------------------
  // Render
  return (
    <>
      <div className="text-xxs flex flex-row space-x-3 pt-4 border-t-[1px]">
        {/* ------------------------------------------ Image Display ------------------------------------------- */}
        <div className={`text-center relative`}>
          <img
            src={getImageUrl(mainDisplay)}
            className={`w-28 aspect-auto ${
              parseInt(onHandQty) <= 0 ? "opacity-50" : ""
            }`}
          ></img>
          <p
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mt-2 text-xs text-red-900 font-bold ${
              parseInt(onHandQty) <= 0 ? "" : "hidden"
            }`}
          >
            Out of Stock
          </p>
        </div>
        {/* ------------------------------------------ Product Info ------------------------------------------- */}
        <div
          className={`flex-grow flex flex-row justify-between items-start space-x-3 ${
            parseInt(onHandQty) <= 0 ? "line-through" : ""
          }`}
        >
          <div className="flex-grow md:flex md:flex-row md:justify-between">
            <div className="capitalize md:flex-grow sm:w-full">
              <p>{productName}</p>
              <p className="mb-2">
                {colorName} / <span className="uppercase">{productSize}</span>
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
                disabled
                onChange={handleQuantityChange}
                className="border-[1px] border-fontExtraLightGrey/50 disabled:bg-[#CBD5E1]/40 bg-transparent w-14 sm:h-fit py-0.5 rounded-sm text-center focus:outline-none"
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

      {/* ------------------------------------------ Edit / Remove Cart ------------------------------------------- */}

      <div className="text-xxxs flex flex-row justify-end space-x-3 my-2">
        <p
          className="cursor-pointer"
          onClick={() =>
            navigateToProduct(
              productName,
              productCode,
              colorName, // optional
              hexColor,
              productSize,
              quantity
            )
          }
        >
          Edit
        </p>
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

export default CartItem;
