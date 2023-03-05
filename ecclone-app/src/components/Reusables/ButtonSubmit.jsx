import React from "react";

const ButtonSubmit = ({ btnText, handleClick }) => {
  return (
    <button
      type="button"
      className="w-full text-white bg-btnTealGreen font-bold py-3 rounded text-xxxs md:text-xxs"
      onClick={handleClick}
    >
      {btnText}
    </button>
  );
};

export default ButtonSubmit;
