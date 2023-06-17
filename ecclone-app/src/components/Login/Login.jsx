import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getCartAsync,
  postMultipleToCartAsync,
} from "../ReduxStore/CartReducer";
import { Link } from "react-router-dom";
import Heading1 from "../Reusables/Heading1";
import InputField from "../Reusables/InputField";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { RxCross1 } from "react-icons/rx";
import AuthContext from "../Context/AuthContext";

const Login = ({ setShowLogin, setShowSignUp }) => {
  //---------------------------------------------------------------------------------------------------
  // States and Context
  //---------------------------------------------------------------------------------------------------
  let {
    loginUser,
    user,
    userId,
    isAdmin,
    authToken,
    status,
    statusText,
    setStatusText,
  } = useContext(AuthContext);
  const dispatch = useDispatch();

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

      if (localStorage.getItem("lbCart")) {
        let cartItems = JSON.parse(localStorage.getItem("lbCart"));
        let cartData = { customerId: userId, cartItems: cartItems };
        let header = { Authorization: `Bearer ${authToken["access_token"]}` };
        dispatch(postMultipleToCartAsync({ cartData, header })).then(() => {
          localStorage.removeItem("lbCart");
          dispatch(getCartAsync(userId));
        });
      } else {
        dispatch(getCartAsync(userId));
      }
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
    </>
  );
};

export default Login;
