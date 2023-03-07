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

const ConfirmReceiptModal = ({ actionResponse }) => {
  const navigate = useNavigate();
  const navigateToShop = () => {
    navigate(`/`);
  };

  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 z-40 text-center">
      <div className=" bg-white px-5 py-5 rounded-lg items-center text-xs text-black">
        {/* ----------------------- Close Login Form Button - navigate to <Shop /> onClick ------------------------ */}
        <div className="float-right pb-3">
          <RxCross1 className="cursor-pointer" onClick={navigateToShop} />
        </div>

        {/* ----------------------------------- Message Body ---------------------------------- */}
        <div className="clear-both flex flex-col justify-center">
          <img
            src={getImageUrl(`orderSubmitted`)}
            alt="Order received"
            className="w-[100px] h-[100px] mx-auto mb-3 bg-bgLightPink"
          ></img>
          <div className="mb-6">
            <p className="mb-2">{`We have received your order!`}</p>
            <p className="">
              (Your reference no :
              <span className="font-bold text-alertWarningFont">{` #${actionResponse?.orderid}`}</span>
              )
            </p>
          </div>

          <ButtonSubmit
            btnText={"CONTINUE SHOPPING"}
            handleClick={navigateToShop}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmReceiptModal;
