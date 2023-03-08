import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import DataContext from "../Context/DataContext";
import { useAxios } from "../CustomHooks/useAxios";
import ProductCart from "../Cart/ProductCart";
import CheckoutSummary from "../Cart/CheckoutSummary";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { RiErrorWarningLine } from "react-icons/ri";

const Cart = () => {
  const {
    customerCart,
    cartSubTotal,
    cartGstAmount,
    pageRefresh,
    setPageRefresh,
  } = useContext(DataContext);
  const { userId: customerId } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, actionResponse, loading, error, fetchData } = useAxios();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});

  console.log("Customer Cart Page", customerCart);
  //--------------------------------------------------------------------------------------------------------
  // Filter customerCart - get all items with zero onHandQty
  let zeroOnHand = customerCart.filter(
    (item, index) => parseInt(item.onHandQty) <= 0
  );
  console.log("Customer Cart Page - zeroOnHand", zeroOnHand);

  //--------------------------------------------------------------------------------------------------------
  // useEffect - remove item from cart
  useEffect(() => {
    if (confirmDelete) {
      let endpoint = `/cart/delete`;
      let cartData = {
        customerId: customerId,
        ...itemToDelete,
      };
      let requestOptions = {
        method: "DELETE",
        data: { ...cartData },
      };
      console.log("cart delete", requestOptions);
      fetchData(endpoint, requestOptions);

      setPageRefresh(!pageRefresh);
      setConfirmDelete(false);
      setItemToDelete({});
    }
  }, [confirmDelete]);

  //-----------------------------------------------------------------------------------------------
  // useNavigate
  const navigateToCheckout = () => {
    navigate(`checkout`);
  };

  const navigateToProduct = (productName, productCode) => {
    navigate(`/product/${productName}`, { state: { productCode } });
  };

  //-------------------------------------------------------------------------------------------------------
  // Handlers
  const handleClick = () => {};

  const handleDelete = (
    e,
    productCode,
    productName,
    productColor,
    productSize
  ) => {
    setItemToDelete((prevState) => {
      return {
        ...prevState,
        productCode: productCode,
        productName: productName,
        productColor: productColor,
        productSize: productSize,
      };
    });
    setConfirmDelete(true);
    //console.log("In delete handler", itemToDelete);
  };

  //-------------------------------------------------------------------------------------------------------
  // Render
  return (
    <div className="">
      {/* ------------------------------------- Cart Header ---------------------------------------------- */}
      <div className="font-playfair font-bold text-xl tracking-wide py-4">
        My Shopping Bag ({customerCart.length})
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 font-poppins text-xxs">
        {/* -------------------------- Continue Shopping Link + Cart Items ------------------------------------------- */}
        <div className="col-span-2">
          <Link to="/">
            <p className=" text-linkTealGreen underline mb-3 hover:no-underline">
              {customerCart.length === 0
                ? "Your shopping bag is currently empty. Start shopping now!"
                : "Continue shopping"}
            </p>
          </Link>
          <div>
            {customerCart.length > 0 &&
              customerCart.map((item, index) => {
                return (
                  <ProductCart
                    key={index}
                    {...item}
                    handleDelete={handleDelete}
                  />
                );
              })}
          </div>
          <div className={`bg-alertWarningBg py-2`}>
            <p className={`flex flex-row items-center text-red-700`}>
              <span className="mx-2 text-xs">
                <RiErrorWarningLine />
              </span>
              Please remove all out of stock items from cart before proceed to
              checkout.
            </p>
          </div>
        </div>
        {/* ------------------------------------- Order Summary ----------------------------------------------- */}
        <div className={`border-[1px] w-full bg-white py-7 px-6`}>
          <CheckoutSummary />
          {/* --- Checkout Button --- */}
          <ButtonSubmit
            btnText="CHECKOUT"
            handleClick={navigateToCheckout}
            disabled={customerCart.length === 0 || zeroOnHand.length !== 0}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
