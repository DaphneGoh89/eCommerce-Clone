import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import ProductCart from "../Cart/ProductCart";

const dummyProductCart = [
  {
    productCode: "hy6144",
    productName: "Lucienne Relaxed Blazer",
    productColor: "124",
    colorName: "White",
    productSize: "s",
    currency: "SGD",
    productPrice: "39.00",
    quantity: "2",
    mainDisplay: "hy5532-014_msousv0o9urzhxyh",
  },
  {
    productCode: "hy6144",
    productName: "Lucienne Relaxed Blazer",
    productColor: "124",
    colorName: "White",
    productSize: "s",
    currency: "SGD",
    productPrice: "39.00",
    quantity: "2",
    mainDisplay: "hy5532-014_msousv0o9urzhxyh",
  },
];

const Cart = () => {
  const [showGst, setShowGst] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [showGiftCard, setShowGiftCard] = useState(false);
  //-------------------------------------------------------------------------------------------------------
  // Handlers
  const handleClick = () => {};

  return (
    <div className="">
      {/* ------------------------------------- Cart Header ---------------------------------------------- */}
      <div className="font-playfair font-bold text-xl tracking-wide py-4">
        My Shopping Bag ({dummyProductCart.length})
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
        {/* -------------------------- Continue Shopping Link + Cart Items ------------------------------------------- */}
        <div className="col-span-2">
          <Link to="/">
            <p className="font-poppins text-xxs text-linkTealGreen underline mb-3 hover:no-underline">
              Continue shopping
            </p>
          </Link>
          <div>
            {dummyProductCart.map((item, index) => {
              return <ProductCart key={index} {...item} />;
            })}
          </div>
        </div>
        {/* ------------------------------------- Order Summary ----------------------------------------------- */}
        <div
          className={`border-[1px] w-full font-poppins text-xxs bg-white py-4 px-6`}
        >
          <p className="text-xs font-semibold tracking-widest mb-3">
            ORDER SUMMARY
          </p>
          {/* --- Subtotal --- */}
          <div className="flex flex-row justify-between mb-1.5">
            <p>Subtotal</p>
            <p>S$ 104.90</p>
          </div>
          {/* --- Shipping --- */}
          <div className="flex flex-row justify-between mb-1.5">
            <p>Shipping & Handling</p>
            <p>S$ 0.00</p>
          </div>
          {/* --- GST Accordion --- */}
          <div className="flex flex-row justify-between mb-1.5 border-t-[1px] pt-1.5">
            <p>GST (Included)</p>
            <span
              className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
                showGst ? "rotate-180" : ""
              }`}
              onClick={() => {
                setShowGst(!showGst);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1"
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  stroke="black"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </div>
          {/* --- GST Calculation --- */}
          <div
            className={`flex flex-row justify-between mb-1.5 pt-1.5 ${
              showGst ? "block" : "hidden"
            }`}
          >
            <p>GST (8%) (Included)</p>
            <p>S$ 7.77</p>
          </div>
          {/* --- Promo Code Accordion --- */}
          <div className="flex flex-row justify-between mb-1.5 border-t-[1px] pt-1.5">
            <p
              className={`${
                showPromo ? "text-black" : "text-fontExtraLightGrey"
              }`}
            >
              Promo Code
            </p>
            <p
              className="text-sm cursor-pointer"
              onClick={() => setShowPromo(!showPromo)}
            >
              {showPromo ? <HiMinusSm /> : <HiPlusSm />}
            </p>
          </div>
          {/* --- Promo Code Input --- */}
          <div className={`${showPromo ? "block mb-2" : "hidden"}`}>
            <div className="flex flex-row justify-between items-center space-x-20 mb-1 pt-1.5">
              <input
                type="text"
                id="promoCode"
                name="promoCode"
                className="flex-grow text-xxxs p-2 border-[1px] border-fontDarkGrey rounded-sm"
                placeholder="Enter promo code here"
              ></input>
              <button className="text-fontExtraLightGrey hover:text-fontDarkGrey border-[1px] border-fontDarkGrey font-semibold py-2 px-6 md:font-normal md:px-3 rounded-sm text-xxs md:text-xxs">
                APPLY
              </button>
            </div>
            <p className="text-xxxs text-fontExtraLightGrey">
              Only one promo code can be applied per transaction.
            </p>
          </div>
          {/* --- Gift Card Accordion --- */}
          <div className="flex flex-row justify-between mb-1.5 border-t-[1px] pt-1.5">
            <p
              className={`${
                showGiftCard ? "text-black" : "text-fontExtraLightGrey"
              }`}
            >
              Gift Card & Welcome Offer
            </p>
            <p
              className="text-sm cursor-pointer"
              onClick={() => setShowGiftCard(!showGiftCard)}
            >
              {showGiftCard ? <HiMinusSm /> : <HiPlusSm />}
            </p>
          </div>
          {/* --- Gift Card Input --- */}
          <div className={`${showGiftCard ? "block mb-2" : "hidden"}`}>
            <div className="flex flex-row justify-between items-center space-x-20 mb-1 pt-1.5">
              <input
                type="text"
                id="promoCode"
                name="promoCode"
                className="flex-grow text-xxxs p-2 border-[1px] border-fontDarkGrey rounded-sm"
                placeholder="Enter gift code here"
              ></input>
              <button className="text-fontExtraLightGrey hover:text-fontDarkGrey border-[1px] border-fontDarkGrey font-semibold py-2 px-6 md:font-normal md:px-3 rounded-sm md:text-xxs text-xxs">
                APPLY
              </button>
            </div>
            <p className="text-xxxs text-fontExtraLightGrey">
              Multiple gift cards can be applied per transaction.
            </p>
          </div>
          {/* --- Calculate Order Total --- */}
          <div className="text-xs font-bold mb-7 pt-1.5 border-t-[1px] border-fontDarkGrey flex flex-row justify-between">
            <p>Total</p>
            <p>S$ 104.90</p>
          </div>
          {/* --- Checkout Button --- */}
          <ButtonSubmit btnText="CHECKOUT" handleClick={handleClick} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
