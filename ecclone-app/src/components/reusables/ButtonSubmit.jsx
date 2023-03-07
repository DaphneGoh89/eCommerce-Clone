import React from "react";

const ButtonSubmit = ({ btnText, handleClick, disabled }) => {
  return (
    <button
      type="submit"
      className="w-full text-white bg-btnTealGreen font-bold py-3 rounded text-xxxs md:text-xxs hover:bg-btnTealGreen/40 disabled:bg-fontLightGrey/40"
      onClick={handleClick}
      disabled={disabled}
    >
      {btnText}
    </button>
  );
};

export default ButtonSubmit;
