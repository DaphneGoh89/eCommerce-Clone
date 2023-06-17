import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";
import DataContext from "../../Context/DataContext";
import { useAxios } from "../../CustomHooks/useAxios";
import CartItem from "./CartItem";
import CheckoutSummary from "../../Cart/CheckoutSummary";
import ButtonSubmit from "../../Reusables/ButtonSubmit";
import { RiErrorWarningLine } from "react-icons/ri";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { customerCart } = useContext(DataContext);
  const { userId: customerId } = useContext(AuthContext);
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const { data, actionResponse, loading, error, fetchData } = useAxios();

  //--------------------------------------------------------------------------------------------------------
  // Filter customerCart - get all items with zero onHandQty
  let zeroOnHand = customerCart.filter(
    (item, index) => parseInt(item.onHandQty) <= 0
  );

  //-----------------------------------------------------------------------------------------------
  // useNavigate
  const navigateToCheckout = () => {
    navigate(`checkout`);
  };

  const navigateToProduct = (productName, productCode) => {
    navigate(`/product/${productName}`, { state: { productCode } });
  };

  //-------------------------------------------------------------------------------------------------------
  // Handlers
  const handleClick = () => {};

  //-------------------------------------------------------------------------------------------------------
  // Render
  return (
    <div className="">
      {/* ------------------------------------- Cart Header ---------------------------------------------- */}
      <div className="font-playfair font-bold text-xl tracking-wide py-4">
        My Shopping Bag ({cart.length})
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 font-poppins text-xxs">
        {/* -------------------------- Continue Shopping Link + Cart Items ------------------------------------------- */}
        <div className="col-span-2">
          <Link to="/">
            <p className=" text-linkTealGreen underline mb-3 hover:no-underline">
              {cart.length === 0
                ? "Your shopping bag is currently empty. Start shopping now!"
                : "Continue shopping"}
            </p>
          </Link>
          <div>
            {cart.length > 0 &&
              cart.map((item, index) => {
                return (
                  <CartItem key={index} {...item} customerId={customerId} />
                );
              })}
          </div>
          {zeroOnHand.length !== 0 && (
            <div className={`bg-alertWarningBg py-2`}>
              <p className={`flex flex-row items-center text-red-700`}>
                <span className="mx-2 text-xs">
                  <RiErrorWarningLine />
                </span>
                Please remove all out of stock items from cart before proceed to
                checkout.
              </p>
            </div>
          )}
        </div>
        {/* ------------------------------------- Order Summary ----------------------------------------------- */}
        <div className={`border-[1px] w-full bg-white py-7 px-6`}>
          <CheckoutSummary />
          {/* --- Checkout Button --- */}
          <ButtonSubmit
            btnText="CHECKOUT"
            handleClick={navigateToCheckout}
            disabled={cart.length === 0 || zeroOnHand.length !== 0}
          />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
