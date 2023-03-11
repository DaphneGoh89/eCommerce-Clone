import React from "react";

const ButtonSubmit = ({ btnText, btnColor, handleClick, disabled }) => {
  return (
    <button
      type="submit"
      className={`w-full text-white font-bold bg-btnTealGreen py-3 rounded text-xxxs md:text-xxs hover:bg-btnTealGreen/40 disabled:bg-fontLightGrey/40`}
      //style={{ backgroundColor: btnColor }}
      onClick={handleClick}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};

export default ButtonSubmit;
