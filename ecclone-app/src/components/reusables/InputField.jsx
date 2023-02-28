import React from "react";

const InputField = ({
  id,
  name,
  type,
  value,
  placeholder,
  handleChange,
  inputStyle,
  labelText,
  labelStyle,
}) => {
  console.log("label text", labelText);
  return (
    <div className="flex items-center tracking-normal mb-4 pb-1 border-b-2 text-xs md:text-sm xl:text-base">
      <label htmlFor={id} className={labelText == undefined ? "" : "mr-4"}>
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        className="flex-grow focus: outline-none placeholder:text-xs"
      ></input>
    </div>
  );
};

export default InputField;
