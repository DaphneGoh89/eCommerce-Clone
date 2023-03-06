import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import DataContext from "../Context/DataContext";
import { useAxios } from "../CustomHooks/useAxios";
import Heading1 from "../Reusables/Heading1";
import CheckoutSummary from "../Cart/CheckoutSummary";
import CheckoutAddrForm from "../Cart/CheckoutAddrForm";
import CheckoutDelvr from "../Cart/CheckoutDelvr";

const Checkout = () => {
  const { userId: customerId, user: firstName } = useContext(AuthContext);
  const { customerCart, cartSubTotal, cartGstAmount } = useContext(DataContext);
  const { data, actionResponse, loading, error, fetchData } = useAxios();
  const [submitOrder, setSubmitOrder] = useState(false);

  // CheckoutInput - initial state object
  const checkoutInitState = {
    customerId: customerId, // get from AuthContext
    firstName: firstName,
    lastName: "",
    orderCurrency: "SGD",
    orderTotal: cartSubTotal, // get from DataContext
    giftcard: "",
    promocode: "",
    giftcardValue: 0,
    promocodeValue: 0,
    shippingFee: 0,
    gstAmount: cartGstAmount, // get from DataContext
    shiptoCountry: "",
    shiptoAddrline1: "",
    shiptoAddrline2: "",
    shiptoCity: "",
    shiptoState: "",
    shiptoPostal: "",
    contactCtrycode: "",
    contactNumber: "",
    deliveryMethod: "",
    deliveryTiming: "",
    pickupStore: "",
    paymentMethod: "",
    paymentAmount: cartSubTotal, // get from DataContext
    orderDetails: customerCart, // get customerCart from DataContext
  };

  const [checkoutInput, setCheckoutInput] = useState(checkoutInitState);
  console.log("checkout customer cart", customerCart);
  console.log("checkout", checkoutInput);

  //--------------------------------------------------------------------------------------------
  // useEffect
  useEffect(() => {
    if (submitOrder) {
      let endpoint = `/order/createOrder`;
      let orderData = {
        ...checkoutInput,
        customerId: customerId,
        orderTotal: cartSubTotal,
        gstAmount: cartGstAmount,
        paymentAmount: cartSubTotal,
        orderDetails: customerCart,
      };
      let requestOptions = {
        method: "PUT",
        data: { ...orderData },
      };
      fetchData(endpoint, requestOptions);
      console.log("Checkout action response", actionResponse);

      // Revert back to original state
      setSubmitOrder(false);
      setCheckoutInput(checkoutInitState);
    }
  }, [submitOrder]);

  //---------------------------------------------------------------------------------------------
  // Handlers
  const handleInputChange = (e) => {
    setCheckoutInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
    console.log("Inspect checkoutInput state change", checkoutInput);
  };

  const handleFormSubmission = () => {
    setSubmitOrder(true);
  };

  //----------------------------------------------------------------------------------------------
  // Render
  return (
    <div className="my-6 ">
      <Heading1 text={"Choose Shipping Method"} />
      <>
        <div className="flex flex-col md:flex-row-reverse md:gap-5">
          {/* -------------------------- Checkout Summary ------------------------------------- */}
          <div className="basis-1/3 border-[1px] w-full bg-white py-7 px-6">
            <CheckoutSummary />
          </div>

          {/* -------------------------- Checkout Address Form ---------------------------------- */}
          <div className="basis-2/3">
            <CheckoutDelvr
              checkoutInput={checkoutInput}
              handleInputChange={handleInputChange}
            />
            <CheckoutAddrForm
              checkoutInput={checkoutInput}
              handleInputChange={handleInputChange}
              handleFormSubmission={handleFormSubmission}
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default Checkout;
