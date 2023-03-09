import React from "react";
import Heading1 from "../Reusables/Heading1";
import FormBaseInput from "../Reusables/FormBaseInput";
import ButtonSubmit from "../Reusables/ButtonSubmit";

const LoginWSignup = () => {
  return (
    <div className="mt-20">
      <Heading1 text={"Customer Login"}></Heading1>
      <form>
        <FormBaseInput
          id={"loginUserId"}
          name={"loginUserId"}
          type={"text"}
          labelText={"Email *"}
          divStyle={"col-span-2"}
          //value={checkoutInput.shiptoAddrline1}
          required={true}
          //handleChange={handleInputChange}
        ></FormBaseInput>
        <FormBaseInput
          id={"loginUserPassword"}
          name={"loginUserPassword"}
          type={"text"}
          labelText={"Password *"}
          divStyle={"col-span-2"}
          //value={checkoutInput.shiptoAddrline1}
          required={true}
          //handleChange={handleInputChange}
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
    </div>
  );
};

export default LoginWSignup;
