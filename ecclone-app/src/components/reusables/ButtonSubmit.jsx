import React from "react";

const ButtonSubmit = ({ btnText, handleClick }) => {
  return (
    <button
      className="w-full text-white bg-btnTealGreen font-bold py-2 rounded text-xxs md:text-xs"
      onClick={handleClick}
    >
      {btnText}
    </button>
  );
};

export default ButtonSubmit;
