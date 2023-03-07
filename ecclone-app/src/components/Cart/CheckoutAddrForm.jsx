import React, { useState } from "react";
import FormBaseInput from "../Reusables/FormBaseInput";
import ButtonSubmit from "../Reusables/ButtonSubmit";

const CheckoutAddrForm = ({
  checkoutInput,
  handleInputChange,
  handleFormSubmission,
}) => {
  return (
    <form
      className="border-[1px] px-6 py-4 mt-4"
      onSubmit={handleFormSubmission}
    >
      <p className="text-sm mb-4">Shipping Address</p>
      {/* -------------------- Delivery Address ----------------------- */}

      <div className="grid grid-cols-2 border-b-[1px]">
        {/* Shipto Address Line 1 */}

        <FormBaseInput
          id={"shipToAddrline1"}
          name={"shiptoAddrline1"}
          type={"text"}
          labelText={"Address & Unit Number *"}
          divStyle={"col-span-2"}
          value={checkoutInput.shiptoAddrline1}
          required={true}
          handleChange={handleInputChange}
        ></FormBaseInput>

        {/* Shipto Address Line 2 */}
        <FormBaseInput
          id={"shipToAddrline2"}
          name={"shiptoAddrline2"}
          type={"text"}
          divStyle={"col-span-2"}
          value={checkoutInput.shiptoAddrline2}
          handleChange={handleInputChange}
        ></FormBaseInput>

        {/* City & State */}
        <div className="col-span-2 flex flex-col md:flex-row">
          <FormBaseInput
            id={"shipToCity"}
            name={"shiptoCity"}
            type={"text"}
            labelText={"City *"}
            divStyle={"mr-2"}
            value={checkoutInput.shiptoCity}
            required={true}
            handleChange={handleInputChange}
          ></FormBaseInput>

          <FormBaseInput
            id={"shipToState"}
            name={"shiptoState"}
            type={"text"}
            labelText={"State / Province"}
            value={checkoutInput.shiptoState}
            handleChange={handleInputChange}
          ></FormBaseInput>
        </div>

        {/* Zip & Postal Code */}
        <FormBaseInput
          id={"shipToPostal"}
          name={"shiptoPostal"}
          type={"text"}
          labelText={"Zip / Postal Code *"}
          divStyle={"mr-2 col-span-2 md:col-span-1"}
          value={checkoutInput.shiptoPostal}
          required={true}
          handleChange={handleInputChange}
        ></FormBaseInput>
      </div>
      {/* -------------------- Contact Info --------------------------- */}
      <div className="grid grid-cols-4 mt-4">
        {/* First & Last Name */}
        <div className="col-span-4 flex flex-col md:flex-row md:space-x-5">
          <FormBaseInput
            id={"firstName"}
            name={"firstName"}
            type={"text"}
            labelText={"First Name *"}
            value={checkoutInput.firstName}
            required={true}
            handleChange={handleInputChange}
          ></FormBaseInput>

          <FormBaseInput
            id={"lastName"}
            name={"lastName"}
            type={"text"}
            labelText={"Last Name *"}
            value={checkoutInput.lastName}
            required={true}
            handleChange={handleInputChange}
          ></FormBaseInput>
        </div>

        {/* Contact Number */}
        <div className="col-span-4 grid grid-cols-4 gap-2">
          <FormBaseInput
            id={"contactCtrycode"}
            name={"contactCtrycode"}
            type={"text"}
            labelText={"Code *"}
            divStyle={"col-span-1"}
            value={checkoutInput.contactCtrycode}
            required={true}
            handleChange={handleInputChange}
          ></FormBaseInput>

          <FormBaseInput
            id={"contactNumber"}
            name={"contactNumber"}
            type={"text"}
            labelText={"Contact Number *"}
            divStyle={"col-span-3"}
            value={checkoutInput.contactNumber}
            required={true}
            handleChange={handleInputChange}
          ></FormBaseInput>
        </div>
      </div>

      <ButtonSubmit
        btnText={"CHECKOUT NOW"}
        // handleClick={handleFormSubmission}
      />
    </form>
  );
};

export default CheckoutAddrForm;
