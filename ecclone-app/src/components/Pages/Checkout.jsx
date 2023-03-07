import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import DataContext from "../Context/DataContext";
import { useAxios } from "../CustomHooks/useAxios";
import Heading1 from "../Reusables/Heading1";
import CheckoutSummary from "../Cart/CheckoutSummary";
import CheckoutAddrForm from "../Cart/CheckoutAddrForm";
import CheckoutDelvr from "../Cart/CheckoutDelvr";
import Backdrop from "../Reusables/Backdrop";
import ConfirmReceiptModal from "../Cart/ConfirmReceiptModal";

const Checkout = () => {
  const {
    authToken,
    userId: customerId,
    user: firstName,
    userLastName: lastName,
  } = useContext(AuthContext);
  const {
    customerCart,
    cartSubTotal,
    cartGstAmount,
    pageRefresh,
    setPageRefresh,
  } = useContext(DataContext);
  const { data, actionResponse, loading, error, fetchData } = useAxios();
  const [submitOrder, setSubmitOrder] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  // CheckoutInput - initial state object
  const checkoutInitState = {
    customerId: customerId, // get from AuthContext
    firstName: firstName,
    lastName: lastName,
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
    contactCtrycode: "+65",
    contactNumber: "",
    deliveryMethod: "delivery", // set default deliveryMethod
    deliveryTiming: "anytime", // set default deliveryTiming
    pickupStore: "",
    paymentMethod: "",
    paymentAmount: cartSubTotal, // get from DataContext
    orderDetails: customerCart, // get customerCart from DataContext
  };

  const [checkoutInput, setCheckoutInput] = useState(checkoutInitState);

  //--------------------------------------------------------------------------------------------
  // useEffect

  // Hide window scroll when modal is open
  useEffect(() => {
    if (showReceiptModal) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showReceiptModal]);

  // Call createOrder API when checkout is confirmed
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
        headers: { Authorization: `Bearer ${authToken["access_token"]}` },
        data: { ...orderData },
      };
      console.log("checkout", requestOptions);
      fetchData(endpoint, requestOptions);

      // Revert back to original state
      setSubmitOrder(false);
      setCheckoutInput(checkoutInitState);
    }
  }, [submitOrder]);

  // Open Confirm Receipt modal when success response is returned from API call
  useEffect(() => {
    if (actionResponse && actionResponse?.status === "Success") {
      setShowReceiptModal(true);
      setPageRefresh(!pageRefresh);
    }
  }, [actionResponse]);

  //---------------------------------------------------------------------------------------------
  // Handlers
  const handleInputChange = (e) => {
    setCheckoutInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
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
      {/* Confirm Receipt Modal */}
      {showReceiptModal && (
        <>
          <Backdrop />
          <ConfirmReceiptModal actionResponse={actionResponse} />
        </>
      )}
    </div>
  );
};

export default Checkout;
