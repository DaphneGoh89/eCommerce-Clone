import React, { useContext, useState } from "react";
import Heading1 from "../Reusables/Heading1";
import InputField from "../Reusables/InputField";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { RxCross1 } from "react-icons/rx";
import AuthContext from "../Context/AuthContext";

const Login = ({ showLogin, setShowLogin, setShowSignUp }) => {
  //---------------------------------------------------------------------------------------------------
  // States and Context
  //---------------------------------------------------------------------------------------------------
  let { loginUser } = useContext(AuthContext);
  const [formInput, setFormInput] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  //---------------------------------------------------------------------------------------------------
  // Functions
  //---------------------------------------------------------------------------------------------------
  const handleSignUpFormDisplay = () => {
    setShowLogin(false);
    setShowSignUp(true);
  };

  const handleInputChange = (e) => {
    setFormInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  //---------------------------------------------------------------------------------------------------
  // Render
  //---------------------------------------------------------------------------------------------------
  return (
    <>
      <div
        className={`w-10/12 md:w-5/12 xl:w-3/12 px-10 py-10 h-full fixed right-0 bg-bgWhite border-l-[1px] duration-1000 ease-in-out z-40 ${
          showLogin ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* -------------------------------- Close Login Form Button --------------------------------------- */}
        <div className="float-right pb-10">
          <RxCross1
            className="cursor-pointer"
            onClick={() => setShowLogin(false)}
          />
        </div>
        {/* -------------------------------------- Form - Header ------------------------------------------- */}
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
          {/* ------------------------------------ Login Form ----------------------------------------------- */}
          <form onSubmit={loginUser}>
            <div className="mt-9">
              <InputField
                id={"loginEmail"}
                name={"loginEmail"}
                type={"email"}
                value={formInput.loginEmail}
                placeholder={"Enter your email here."}
                onChange={handleInputChange}
              />
              <InputField
                id={"loginPassword"}
                name={"loginPassword"}
                type={"password"}
                value={formInput.loginPassword}
                placeholder={"Enter password"}
                onChange={handleInputChange}
              />
            </div>
            {/* ---------------------- Login Button -------------------------- */}
            <div className="mt-9">
              <ButtonSubmit btnText={"LOG IN"} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
