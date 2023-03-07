import React from "react";

const FormBaseInput = ({
  // Input tag attributes
  id,
  name,
  type,
  value,
  required,
  placeholder,
  handleChange,
  disabled,
  inputStyle,

  // Label tag attribute
  labelText,
  labelStyle,

  // Div attribute
  divStyle,
}) => {
  return (
    <div
      className={`flex-grow flex flex-col tracking-normal mb-4 pb-1 text-xxxs md:text-xxs ${divStyle}`}
    >
      <label
        htmlFor={id}
        className={`mb-1 ${labelText == undefined ? "" : "mr-4"}`}
      >
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={handleChange}
        disabled={disabled}
        className="flex-grow w-full text-xs border-[0.5px] border-fontExtraLightGrey py-2 px-4 rounded-sm focus:outline-none focus:border-fontDarkGrey placeholder:text-xs disabled:bg-[#CBD5E1]/40"
      ></input>
    </div>
  );
};

export default FormBaseInput;
