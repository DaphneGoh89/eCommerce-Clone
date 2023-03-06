import React from "react";

const ButtonSubmit = ({ btnText, handleClick }) => {
  return (
    <button
      className="w-full text-white bg-btnTealGreen font-bold py-3 rounded text-xxxs md:text-xxs hover:bg-btnTealGreen/40"
      onClick={handleClick}
    >
      {btnText}
    </button>
  );
};

export default ButtonSubmit;
