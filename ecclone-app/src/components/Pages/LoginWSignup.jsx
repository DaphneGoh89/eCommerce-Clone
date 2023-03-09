import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import Heading1 from "../Reusables/Heading1";
import FormBaseInput from "../Reusables/FormBaseInput";
import ButtonSubmit from "../Reusables/ButtonSubmit";

const LoginWSignup = () => {
  //---------------------------------------------------------------------------------------------------
  // States and Context
  //---------------------------------------------------------------------------------------------------
  let { loginUser, status, statusText } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formInput, setFormInput] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  //---------------------------------------------------------------------------------------------------
  // Handlers
  const handleInputChange = (e) => {
    setFormInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const navigateToCart = () => {
    navigate("/cart");
  };

  //---------------------------------------------------------------------------------------------------
  // Display login status
  useEffect(() => {
    if (status === 200) {
      navigateToCart();
    }
  }, [status]);

  //---------------------------------------------------------------------------------------------------
  // Render
  return (
    <div className="mt-20">
      <Heading1 text={"Customer Login"}></Heading1>
      <form onSubmit={loginUser}>
        <FormBaseInput
          id={"loginUserId"}
          name={"loginEmail"}
          type={"text"}
          labelText={"Email *"}
          divStyle={"col-span-2"}
          value={formInput.loginEmail}
          required={true}
          handleChange={handleInputChange}
        ></FormBaseInput>
        <FormBaseInput
          id={"loginUserPassword"}
          name={"loginPassword"}
          type={"text"}
          labelText={"Password *"}
          divStyle={"col-span-2"}
          value={formInput.loginPassword}
          required={true}
          handleChange={handleInputChange}
        ></FormBaseInput>
        <div className="text-xxs flex flex-row items-center space-x-3">
          <input type="checkbox" id="showPassword" name="showPassword"></input>
          <label htmlFor="showPassword">Show Password</label>
        </div>
        <div className="text-xxs flex flex-row items-center space-x-3">
          <input type="checkbox" id="rememberUser" name="rememberUser"></input>
          <label htmlFor="rememberUser">Remember Me</label>
        </div>
        <div className="mt-5">
          <ButtonSubmit btnText={"SIGN IN"}></ButtonSubmit>
        </div>
      </form>
      <div
        className={`mt-9 py-3 px-3 text-xxs ${
          status === null
            ? "hidden"
            : status === 200
            ? "bg-alertInfoBg text-alertInfoFont"
            : "bg-alertPinkInfoBg text-alertWarningFont"
        } `}
      >
        {statusText}
      </div>
    </div>
  );
};

export default LoginWSignup;
