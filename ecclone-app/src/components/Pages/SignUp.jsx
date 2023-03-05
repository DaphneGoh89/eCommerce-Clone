import React from "react";
import Heading1 from "../Reusables/Heading1";
import InputField from "../Reusables/InputField";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { RxCross1 } from "react-icons/rx";

const SignUp = ({ showSignUp, setShowSignUp }) => {
  return (
    <>
      <div
        className={`w-10/12 md:w-5/12 xl:w-3/12 px-10 py-10 h-full fixed right-0 bg-bgWhite border-l-[1px] duration-1000 ease-in-out z-40 ${
          showSignUp ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close signup form */}
        <div className="float-right pb-10">
          <RxCross1
            className="cursor-pointer"
            onClick={() => setShowSignUp(false)}
          />
        </div>
        {/* Form - Header */}
        <div className="clear-both flex flex-col justify-center items-left text-center">
          <Heading1 text={"Create An Account"} />
          {/* Form - Body */}
          <div className="mt-9 flex flex-row space-x-2 w-full justify-between">
            <InputField
              id={"firstName"}
              name={"firstName"}
              type={"text"}
              value={""}
              placeholder={"First Name*"}
              onChange={"handleChange"}
            />
            <InputField
              id={"lastName"}
              name={"lastName"}
              type={"text"}
              value={""}
              placeholder={"Last Name*"}
              onChange={"handleChange"}
            />
          </div>
          <div>
            <InputField
              id={"email"}
              name={"email"}
              type={"email"}
              value={""}
              placeholder={"Email Address*"}
              onChange={"handleChange"}
            />
            <InputField
              id={"password"}
              name={"password"}
              type={"password"}
              value={""}
              placeholder={"Password*"}
              onChange={"handleChange"}
            />
            <InputField
              id={"dob"}
              name={"dob"}
              type={"date"}
              value={""}
              placeholder={"Tell Us Your Birthday!"}
              onChange={"handleChange"}
            />
          </div>
          {/* Submit Form Button */}
          <div className="mt-9">
            <ButtonSubmit btnText={"CREATE ACCOUNT"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
