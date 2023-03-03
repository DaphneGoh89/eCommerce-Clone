import React from "react";
import Heading1 from "../Reusables/Heading1";
import InputField from "../Reusables/InputField";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { RxCross1 } from "react-icons/rx";

const Login = ({ showLogin, setShowLogin, setShowSignUp }) => {
  const handleSignUpFormDisplay = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };
  return (
    <>
      <div
        className={`w-10/12 md:w-5/12 xl:w-3/12 px-10 py-10 h-full fixed right-0 bg-bgWhite border-l-[1px] duration-1000 ease-in-out z-40 ${
          showLogin ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close login form */}
        <div className="float-right pb-10">
          <RxCross1
            className="cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>
        {/* Form - Header */}
        <div className="clear-both flex flex-col justify-center items-left text-center">
          <Heading1 text={"Log In"} />
          <p className="text-xxs md:text-xs ">
            Don't have an account?{" "}
            <span
              className="underline cursor-pointer"
              onClick={handleSignUpFormDisplay}
            >
              Sign up here!
            </span>
          </p>
          {/* Form - Body */}
          <div className="mt-9">
            <InputField
              id={"email"}
              name={"email"}
              type={"email"}
              value={""}
              placeholder={"janedoe@gmail.com"}
              onChange={"handleChange"}
            />
            <InputField
              id={"password"}
              name={"password"}
              type={"password"}
              value={""}
              placeholder={"password"}
              onChange={"handleChange"}
            />
          </div>
          {/* Login Button */}
          <div className="mt-9">
            <ButtonSubmit btnText={"LOG IN"} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
