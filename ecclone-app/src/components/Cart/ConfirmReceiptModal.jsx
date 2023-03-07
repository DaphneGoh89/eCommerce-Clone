import React from "react";
import { useNavigate } from "react-router";
import { RxCross1 } from "react-icons/rx";
import ButtonSubmit from "../Reusables/ButtonSubmit";

//--------------------------------------------------------------------------------------------------------
// Function required for displaying images saved in Assets folder
//--------------------------------------------------------------------------------------------------------
function getImageUrl(name) {
  return new URL(`../../assets/site_images/${name}.gif`, import.meta.url).href;
}

const ConfirmReceiptModal = () => {
  const navigate = useNavigate();
  const navigateToShop = () => {
    navigate(`/`);
  };

  return (
    <div className=" bg-white px-5 py-5 rounded-lg items-center text-xs text-btnTealGreen/80">
      {/* -------------------------------- Close Login Form Button --------------------------------------- */}
      <div className="float-right pb-3">
        <RxCross1 className="cursor-pointer" onClick={navigateToShop} />
      </div>
      <div className="clear-both flex flex-col justify-center">
        <img
          src={getImageUrl(`orderSubmitted`)}
          alt="Order received"
          className="w-[100px] h-[100px] mx-auto mb-3 bg-bgLightPink"
        ></img>
        <div className="mb-6">
          <p className="">We have received your order!</p>
          {/* To show order ID here. */}
        </div>

        <ButtonSubmit
          btnText={"CONTINUE SHOPPING"}
          handleClick={navigateToShop}
        />
      </div>
    </div>
  );
};

export default ConfirmReceiptModal;
