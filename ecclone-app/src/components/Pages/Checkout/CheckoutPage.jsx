import React, { useState, useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import AuthContext from "../../Context/AuthContext";
import DataContext from "../../Context/DataContext";
import { useAxios } from "../../CustomHooks/useAxios";
import Heading1 from "../../Reusables/Heading1";
import CheckoutSummary from "../../Cart/CheckoutSummary";
import CheckoutProductCart from "../../Cart/CheckoutProductCart";
import CheckoutAddrForm from "../../Cart/CheckoutAddrForm";
import CheckoutDelvr from "../../Cart/CheckoutDelvr";
import Backdrop from "../../Reusables/Backdrop";
import ConfirmReceiptModal from "../../Cart/ConfirmReceiptModal";

const CheckoutPage = () => {
  const { cart } = useSelector((state) => state.cart);
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
  const [showCart, setShowCart] = useState(false);
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken["access_token"]}`,
        },
        data: { ...orderData },
      };
      // Execute API calling
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
          <div className="basis-1/3 border-[1px] w-full bg-white py-5 px-6">
            <div>
              {/* -------------------------- My Bag Accordion ------------------------------------- */}

              <div
                className={`flex flex-row justify-between ${
                  !showCart ? "border-b-[1px] mb-3" : ""
                }`}
              >
                <p className="text-xs font-semibold tracking-widest pb-3">
                  My Bag ({cart.length})
                </p>
                <span
                  className={`ml-auto h-4 w-4 shrink-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
                    showCart ? "rotate-180" : ""
                  }`}
                  onClick={() => {
                    setShowCart(!showCart);
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
              {/* -------------------------- Items in Cart ------------------------------------- */}
              {showCart &&
                cart.length > 0 &&
                cart.map((item, index) => {
                  return <CheckoutProductCart key={index} {...item} />;
                })}
            </div>

            {/* -------------------------- Checkout Summary ------------------------------------- */}
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

export default CheckoutPage;
