import React, { useState } from "react";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import ButtonSubmit from "../Reusables/ButtonSubmit";

const CheckoutDelvr = ({ checkoutInput, handleInputChange }) => {
  const [showHomeDel, setShowHomeDel] = useState(true);
  const [showPickUp, setShowPickUp] = useState(null);

  return (
    <div className="text-xxs border-[1px] px-6 py-4 mt-4 md:mt-0">
      <p className="text-sm mb-4">Pick Your Shipping Method</p>
      {/* --- Home Delivery Accordion --- */}
      <div className="flex flex-row justify-between mb-1.5 border-t-[1px] pt-1.5">
        <p
          className={`${
            showHomeDel ? "text-black" : "text-fontExtraLightGrey"
          }`}
        >
          HOME DELIVERY
        </p>
        <p
          className="text-sm cursor-pointer"
          onClick={() => setShowHomeDel(!showHomeDel)}
        >
          {showHomeDel ? <HiMinusSm /> : <HiPlusSm />}
        </p>
      </div>
      {/* --- Home Delivery Select Option --- */}
      <div className={`${showHomeDel ? "block mb-2" : "hidden"}`}>
        <div className="flex flex-row items-start space-x-4 mb-1 pt-1.5">
          <input
            type="radio"
            id="delivery"
            name="deliveryMethod"
            value="delivery"
            checked={checkoutInput.deliveryMethod === "delivery"}
            onChange={handleInputChange}
          ></input>
          <div>
            <label htmlFor="delivery">
              Standard Courier (4 - 7 business days) - Free
            </label>

            {/* Preferred Delivery Timing */}
            <div className="mt-2">
              <p className="mb-1">Select your preferred delivery timing</p>
              {/* Anytime */}
              <div className="flex flex-row items-center space-x-2 pb-1">
                <input
                  type="radio"
                  id="anytime"
                  name="deliveryTiming"
                  value="anytime"
                  checked={checkoutInput.deliveryTiming === "anytime"}
                  onChange={handleInputChange}
                  disabled={checkoutInput.deliveryMethod === "selfCollect"}
                ></input>
                <label htmlFor="anytime">Anytime</label>
              </div>
              {/* Daytime */}
              <div className="flex flex-row items-center space-x-2 pb-1">
                <input
                  type="radio"
                  id="daytime"
                  name="deliveryTiming"
                  value="daytime"
                  checked={checkoutInput.deliveryTiming === "daytime"}
                  onChange={handleInputChange}
                  disabled={checkoutInput.deliveryMethod === "selfCollect"}
                ></input>
                <label htmlFor="dayTime">Daytime (9am - 6pm)</label>
              </div>
              {/* Evening */}
              <div className="flex flex-row items-center space-x-2 pb-1">
                <input
                  type="radio"
                  id="evening"
                  name="deliveryTiming"
                  value="evening"
                  checked={checkoutInput.deliveryTiming === "evening"}
                  onChange={handleInputChange}
                  disabled={checkoutInput.deliveryMethod === "selfCollect"}
                ></input>
                <label htmlFor="evening">Evening (6pm - 10pm)</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* --- Self Collection Accordion --- */}
      <div className="flex flex-row justify-between mb-1.5 border-t-[1px] pt-1.5">
        <p
          className={`${showPickUp ? "text-black" : "text-fontExtraLightGrey"}`}
        >
          SELF COLLECTION
        </p>
        <p
          className="text-sm cursor-pointer"
          onClick={() => setShowPickUp(!showPickUp)}
        >
          {showPickUp ? <HiMinusSm /> : <HiPlusSm />}
        </p>
      </div>
      {/* Self Collection Select Option */}
      <div className={`${showPickUp ? "block mb-2" : "hidden"}`}>
        <div className="flex flex-row items-start space-x-4 mb-1 pt-1.5">
          <input
            type="radio"
            id="selfCollect"
            name="deliveryMethod"
            value="selfCollect"
            checked={checkoutInput.deliveryMethod === "selfCollect"}
            onChange={handleInputChange}
          ></input>
          <div>
            <label htmlFor="homeDel">Store collection</label>

            {/* Preferred Self PickUp Store */}
            <div className="mt-2">
              <p className="mb-1">Select your preferred store location</p>
              {/* Anytime */}
              <div className="flex flex-row items-center space-x-2 pb-1">
                <input
                  type="radio"
                  id="jem"
                  name="pickupStore"
                  value="jem"
                  checked={checkoutInput.pickupStore === "jem"}
                  onChange={handleInputChange}
                  disabled={checkoutInput.deliveryMethod === "delivery"}
                ></input>
                <label htmlFor="jem">JEM</label>
              </div>
              {/* Daytime */}
              <div className="flex flex-row items-center space-x-2 pb-1">
                <input
                  type="radio"
                  id="somerset"
                  name="pickupStore"
                  value="somerset"
                  checked={checkoutInput.pickupStore === "somerset"}
                  onChange={handleInputChange}
                  disabled={checkoutInput.deliveryMethod === "delivery"}
                ></input>
                <label htmlFor="somerset">Somerset</label>
              </div>
              {/* Evening */}
              <div className="flex flex-row items-center space-x-2 pb-1">
                <input
                  type="radio"
                  id="funan"
                  name="pickupStore"
                  value="funan"
                  checked={checkoutInput.pickupStore === "funan"}
                  onChange={handleInputChange}
                  disabled={checkoutInput.deliveryMethod === "delivery"}
                ></input>
                <label htmlFor="funan">Funan</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDelvr;
