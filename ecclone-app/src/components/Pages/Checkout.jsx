import React, { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import DataContext from "../Context/DataContext";
import Heading1 from "../Reusables/Heading1";
import CheckoutSummary from "../Cart/CheckoutSummary";
import CheckoutAddrForm from "../Cart/CheckoutAddrForm";
import CheckoutDelvr from "../Cart/CheckoutDelvr";

/*  Create Order JSON
{
  "customerId" : 1,
  "firstName": "Daphne",
  "lastName": "Goh",
  "orderCurrency": "SGD",
  "orderTotal": 200.00,
  "giftcard": null,
  "promocode" : null,
  "giftcardValue": null,
  "promocodeValue": null,
  "shippingFee": null,
  "gstAmount": 16.00,
  "shiptoCountry": "SG",
  "shiptoAddrline1": null,
  "shiptoAddrline2": null,
  "shiptoPostal" : null,
  "contactCtrycode": "+65",
  "contactNumber": "88151234",
  "deliveryMethod": "P",
  "deliveryTiming": null,
  "paymentMethod": "Paypal",
  "paymentAmount": 100.00,
  "orderDetails": [
      {
          "productCode": "th1849",
          "productName": "Dress A",
          "productColor": "026",
          "productSize": "s",
          "orderQty": 2,
          "unitPrice": 50.00,
          "lineTotal": 100.00
      }
  ]
}

*/

const Checkout = () => {
  const { userId: customerId, user: firstName } = useContext(AuthContext);
  const { cartSubTotal } = useContext(DataContext);
  const [checkoutInput, setCheckoutInput] = useState({
    customerId: customerId, // get from AuthContext
    firstName: firstName,
    lastName: "",
    orderCurrency: "",
    orderTotal: cartSubTotal, // get from DataContext
    giftcard: "",
    promocode: "",
    giftcardValue: 0,
    promocodeValue: 0,
    shippingFee: 0,
    gstAmount: 0, // get from DataContext
    shiptoCountry: "",
    shiptoAddrline1: "",
    shiptoAddrline2: "",
    shiptoCity: "",
    shiptoState: "",
    shiptoPostal: "",
    contactCtryCode: "",
    contactNumber: "",
    deliveryMethod: "",
    deliveryTiming: "",
    paymentMethod: "",
    paymentAmount: cartSubTotal, // get from DataContext
    orderDetails: [], // get customerCart from DataContext
  });

  console.log("checkout", checkoutInput);

  //---------------------------------------------------------------------------------------------
  // Handlers
  const handleInputChange = (e) => {
    setCheckoutInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
    console.log("Inspect checkoutInput state change", checkoutInput);
  };

  return (
    <div className="my-6 ">
      <Heading1 text={"Choose Shipping Method"} />
      <>
        <div className="flex flex-col md:flex-row-reverse md:gap-5">
          {/* -------------------------- Checkout Summary ------------------------------------- */}
          <div className="basis-1/3 border-[1px] w-full bg-white py-7 px-6">
            <CheckoutSummary cartSubTotal={cartSubTotal} />
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
            />
          </div>
        </div>
      </>
    </div>
  );
};

export default Checkout;
