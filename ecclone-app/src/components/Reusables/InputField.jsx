import React from "react";

const InputField = ({
  id,
  name,
  type,
  value,
  placeholder,
  handleChange,
  disabled,
  inputStyle,
  labelText,
  labelStyle,
}) => {
  return (
    <div className="flex items-center tracking-normal mb-4 border-b-2 text-xxs md:text-sm xl:text-base">
      <label htmlFor={id} className={labelText == undefined ? "" : "mr-4"}>
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
        className="flex-grow text-xxs focus: outline-none placeholder:text-xxs disabled:bg-[#CBD5E1]/40"
      ></input>
    </div>
  );
};

export default InputField;
