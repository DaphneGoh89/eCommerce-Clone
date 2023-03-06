import React, { useState, useContext } from "react";
import DataContext from "../Context/DataContext";
import Heading1 from "../Reusables/Heading1";
import CheckoutSummary from "../Cart/CheckoutSummary";
import CheckoutAddrForm from "../Cart/CheckoutAddrForm";
import CheckoutDelvr from "../Cart/CheckoutDelvr";

const Checkout = () => {
  const { cartSubTotal } = useContext(DataContext);
  const [checkoutInput, setCheckoutInput] = useState({
    shiptoAddrline1: "",
    shiptoAddrline2: "",
    shiptoCity: "",
    shiptoState: "",
    shiptoPostal: "",
    firstName: "",
    lastName: "",
    contactCtryCode: "",
    contactNumber: "",
  });

  return (
    <div className="my-6">
      <Heading1 text={"Choose Shipping Method"} />
      <>
        <div className="flex flex-col md:flex-row-reverse md:gap-5">
          {/* -------------------------- Checkout Summary ------------------------------------- */}
          <div className="basis-1/3">
            <CheckoutSummary cartSubTotal={cartSubTotal} />
          </div>

          {/* -------------------------- Checkout Address Form ---------------------------------- */}
          <div className="basis-2/3">
            <CheckoutDelvr />
            <CheckoutAddrForm />
          </div>
        </div>
      </>
    </div>
  );
};

export default Checkout;
