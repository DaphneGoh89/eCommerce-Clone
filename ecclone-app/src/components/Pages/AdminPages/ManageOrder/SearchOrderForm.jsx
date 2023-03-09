import React from "react";
import Heading1 from "../../../Reusables/Heading1";
import FormBaseInput from "../../../Reusables/FormBaseInput";
import ButtonSubmit from "../../../Reusables/ButtonSubmit";

const SearchOrderForm = () => {
  return (
    <form>
      <Heading1 text={"View Orders"} />
      {/* ------------------------------------- Order Data Range ---------------------------------------------- */}
      {/* <div className="grid grid-cols-4 space-x-2"> */}
      <FormBaseInput
        id={"orderDateFrom"}
        name={"orderDateFrom"}
        type={"date"}
        labelText={"Order Date From"}
        //value={checkoutInput.shiptoAddrline1}
        required={true}
        //handleChange={handleInputChange}
      ></FormBaseInput>
      <FormBaseInput
        id={"orderDateTo"}
        name={"orderDateTo"}
        type={"date"}
        labelText={"Order Date To"}
        //value={checkoutInput.shiptoAddrline1}
        required={true}
        //handleChange={handleInputChange}
      ></FormBaseInput>
      {/* </div> */}

      {/* -------------------------------------- Country & Postal Range --------------------------------------- */}
      {/* <div className="grid grid-cols-4 space-x-2"> */}
      <FormBaseInput
        id={"orderCountry"}
        name={"orderCountry"}
        type={"text"}
        labelText={"Country"}
        //value={checkoutInput.shiptoAddrline1}
        required={false}
        //handleChange={handleInputChange}
      ></FormBaseInput>
      <FormBaseInput
        id={"orderPostalFrom"}
        name={"orderPostalFrom"}
        type={"text"}
        labelText={"Postal Code From"}
        //value={checkoutInput.shiptoAddrline1}
        required={false}
        //handleChange={handleInputChange}
      ></FormBaseInput>
      <FormBaseInput
        id={"orderPostalTo"}
        name={"orderPostalTo"}
        type={"text"}
        labelText={"Postal Code To"}
        //value={checkoutInput.shiptoAddrline1}
        required={false}
        //handleChange={handleInputChange}
      ></FormBaseInput>
      {/* </div> */}
      {/* ------------------------------------------ Order Status -------------------------------------------------- */}
      <div className="text-xs flex flex-col">
        <label htmlFor="orderStatus" className="mr-4 mb-1 text-xxs">
          Order Status:
        </label>
        <select
          id="orderStatus"
          name="orderStatus"
          data-te-select-init
          // value={selectedQty}
          // onChange={handleQtyChange}
          className="w-full py-2 px-2 rounded-sm border-[0.5px] border-fontExtraLightGrey focus:border-fontDarkGrey  focus:outline-none"
        >
          <option value="O">Open Order</option>
          <option value="D">Delivered</option>
          <option value="C">Cancelled</option>
          <option value="R">Returned</option>
        </select>
      </div>
      <div className="mt-5">
        <ButtonSubmit
          btnText={"SEARCH"}
          btnColor={"black"}
          disabled={false}
        ></ButtonSubmit>
      </div>
    </form>
  );
};

export default SearchOrderForm;
