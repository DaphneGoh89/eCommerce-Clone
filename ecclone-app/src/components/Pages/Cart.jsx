import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import DataContext from "../Context/DataContext";
import { useAxios } from "../CustomHooks/useAxios";
import ProductCart from "../Cart/ProductCart";
import CheckoutSummary from "../Cart/CheckoutSummary";
import ButtonSubmit from "../Reusables/ButtonSubmit";

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

  //--------------------------------------------------------------------------------------------------------
  // Calculate Cart Total
  // const cartSubTotal = customerCart.reduce((subTotal, item) => {
  //   return subTotal + parseFloat(item.productPrice) * parseFloat(item.quantity);
  // }, 0);

  //-------------------------------------------------------------------------------------------------------
  // Handlers
  const handleClick = () => {};

  //-----------------------------------------------------------------------------------------------
  // useNavigate
  const navigateToCheckout = () => {
    navigate(`checkout`);
  };

  const navigateToProduct = (productName, productCode) => {
    navigate(`/product/${productName}`, { state: { productCode } });
  };

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

      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5">
        {/* -------------------------- Continue Shopping Link + Cart Items ------------------------------------------- */}
        <div className="col-span-2">
          <Link to="/">
            <p className="font-poppins text-xxs text-linkTealGreen underline mb-3 hover:no-underline">
              Continue shopping
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
        </div>
        {/* ------------------------------------- Order Summary ----------------------------------------------- */}
        <div className={`border-[1px] w-full bg-white py-7 px-6`}>
          <CheckoutSummary />
          {/* --- Checkout Button --- */}
          <ButtonSubmit btnText="CHECKOUT" handleClick={navigateToCheckout} />
        </div>
      </div>
    </div>
  );
};

export default Cart;
