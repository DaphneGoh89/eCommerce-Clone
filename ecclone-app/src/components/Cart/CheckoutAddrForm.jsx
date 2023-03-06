import React from "react";
import FormBaseInput from "../Reusables/FormBaseInput";
import ButtonSubmit from "../Reusables/ButtonSubmit";

const CheckoutAddrForm = () => {
  return (
    <div className="border-[1px] px-6 py-4 mt-4">
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
        ></FormBaseInput>

        {/* Shipto Address Line 2 */}
        <FormBaseInput
          id={"shipToAddrline2"}
          name={"shiptoAddrline2"}
          type={"text"}
          divStyle={"col-span-2"}
        ></FormBaseInput>

        {/* City & State */}
        <div className="col-span-2 flex flex-col md:flex-row">
          <FormBaseInput
            id={"shipToCity"}
            name={"shiptoCity"}
            type={"text"}
            labelText={"City *"}
            divStyle={"mr-2"}
          ></FormBaseInput>

          <FormBaseInput
            id={"shipToState"}
            name={"shiptoState"}
            type={"text"}
            labelText={"State / Province"}
          ></FormBaseInput>
        </div>

        {/* Zip & Postal Code */}
        <FormBaseInput
          id={"shipToPostal"}
          name={"shiptoPostal"}
          type={"text"}
          labelText={"Zip / Postal Code *"}
          divStyle={"mr-2 col-span-2 md:col-span-1"}
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
          ></FormBaseInput>

          <FormBaseInput
            id={"lastName"}
            name={"lastName"}
            type={"text"}
            labelText={"Last Name *"}
          ></FormBaseInput>
        </div>

        {/* Contact Number */}
        <div className="col-span-4 grid grid-cols-4 gap-2">
          <FormBaseInput
            id={"contactCtryCode"}
            name={"contactCtryCode"}
            type={"text"}
            labelText={"Code *"}
            divStyle={"col-span-1"}
          ></FormBaseInput>

          <FormBaseInput
            id={"contactNumber"}
            name={"contactNumber"}
            type={"text"}
            labelText={"Contact Number *"}
            divStyle={"col-span-3"}
          ></FormBaseInput>
        </div>
      </div>

      <ButtonSubmit btnText={"PROCEED TO PAYMENT"} />
    </div>
  );
};

export default CheckoutAddrForm;
