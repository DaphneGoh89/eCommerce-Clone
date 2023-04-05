import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Heading1 from "../Reusables/Heading1";
import InputField from "../Reusables/InputField";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { RxCross1 } from "react-icons/rx";
import AuthContext from "../Context/AuthContext";

const Login = ({ showLogin, setShowLogin, setShowSignUp }) => {
  //---------------------------------------------------------------------------------------------------
  // States and Context
  //---------------------------------------------------------------------------------------------------
  let {
    loginUser,
    user,
    isAdmin,
    authToken,
    status,
    statusText,
    setStatusText,
  } = useContext(AuthContext);

  const [formInput, setFormInput] = useState({
    loginEmail: "",
    loginPassword: "",
  });

  // Close Login component after user has logged in successfully
  useEffect(() => {
    if (status === 200) {
      setShowLogin(false);
      //setStatusText("");
      //setStatusText(null);
    }
  }, [status]);

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
        className={`w-10/12 text-xxs md:text-xs md:w-5/12 xl:w-3/12 px-10 py-10 h-full fixed right-0 bg-bgWhite border-l-[1px] duration-1000 ease-in-out z-40 ${
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
          <Heading1 text={authToken ? `Welcome ${user}` : "Log In"} />
          <p className={`${!authToken ? "block" : "hidden"}`}>
            Don't have an account?
            <span
              className="underline cursor-pointer ml-1"
              onClick={handleSignUpFormDisplay}
            >
              Sign up here!
            </span>
          </p>
          <p
            className={`${
              authToken ? "block underline cursor-pointer" : "hidden"
            }`}
          >
            Sign in with another account
          </p>
          {/* ------------------------------------ Login Form ----------------------------------------------- */}
          {!authToken && (
            <form onSubmit={loginUser}>
              <div className="mt-9">
                <InputField
                  id={"loginEmail"}
                  name={"loginEmail"}
                  type={"email"}
                  value={formInput.loginEmail}
                  placeholder={`${!authToken ? "Enter your email here" : ""}`}
                  onChange={handleInputChange}
                  disabled={authToken}
                />
                <InputField
                  id={"loginPassword"}
                  name={"loginPassword"}
                  type={"password"}
                  value={formInput.loginPassword}
                  placeholder={`${!authToken ? "Enter password" : ""}`}
                  onChange={handleInputChange}
                  disabled={authToken}
                />
              </div>
              {/* ---------------------- Login Button -------------------------- */}
              <div className="mt-9">
                <ButtonSubmit
                  btnText={`${
                    !authToken ? "LOG IN" : "You've Already Logged In"
                  }`}
                />
              </div>
            </form>
          )}

          {/* --------------------------------- Admin User Menu ---------------------------------------------- */}
          {authToken && isAdmin === "Y" && (
            <div className=" mt-10 text-xxs">
              <p className="link-spacing link-underline-animation">
                Dashboard (WIP)
              </p>
              <p className="link-spacing link-underline-animation">
                Manage Products (WIP)
              </p>
              <Link to="/admin/manageorder">
                <p className="link-spacing link-underline-animation">
                  Manage Orders
                </p>
              </Link>
            </div>
          )}

          {/* --------------------------------- Normal User Menu ---------------------------------------------- */}
          {authToken && isAdmin === "N" && (
            <div className=" mt-10 space-y-4 text-xxs">
              <p className="link-spacing link-underline-animation">
                Manage My Order
              </p>
              <p className="link-spacing link-underline-animation">
                Manage Return
              </p>
              <p className="link-spacing link-underline-animation">
                View My Carts
              </p>
              <p className="link-spacing link-underline-animation">
                View My Favorites
              </p>
            </div>
          )}

          {/* --------------------------- Status message after login API call -------------------------------- */}

          <div
            className={`mt-9 py-3 ${
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
      </div>
    </>
  );
};

export default Login;
