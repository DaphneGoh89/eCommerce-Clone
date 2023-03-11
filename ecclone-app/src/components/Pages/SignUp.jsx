import React, { useState, useEffect } from "react";
import { useAxios } from "../CustomHooks/useAxios";
import Heading1 from "../Reusables/Heading1";
import InputField from "../Reusables/InputField";
import ButtonSubmit from "../Reusables/ButtonSubmit";
import { RxCross1 } from "react-icons/rx";

const SignUp = ({ showSignUp, setShowSignUp }) => {
  //----------------------------------------------------------------------------------------
  // States & Hooks
  const { data, actionResponse, loading, error, fetchData } = useAxios();
  const [submitForm, setSubmitForm] = useState(false);
  const signupInitState = {
    userFirstName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
  };
  const [signupInput, setSignupInput] = useState(signupInitState);

  //----------------------------------------------------------------------------------------
  // useEffect
  useEffect(() => {
    if (submitForm) {
      let endpoint = `/user/signup`;

      let requestOptions = {
        method: "PUT",
        data: {
          firstName: signupInput.userFirstName,
          lastName: signupInput.userLastName,
          email: signupInput.userEmail,
          password: signupInput.userPassword,
        },
      };
      fetchData(endpoint, requestOptions);

      // Revert back to original state
      setSubmitForm(false);
    }
  }, [submitForm]);

  useEffect(() => {
    if (actionResponse?.status === "Success") {
      setSignupInput(signupInitState);
      setShowSignUp(false);
    }
  }, [actionResponse]);

  //----------------------------------------------------------------------------------------
  // Handlers
  const handleChange = (e) => {
    setSignupInput((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmission = (e) => {
    e.preventDefault();
    setSubmitForm(true);
  };

  //----------------------------------------------------------------------------------------
  // Render
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
        <form
          className="clear-both flex flex-col justify-center items-left text-center"
          onSubmit={handleFormSubmission}
        >
          <Heading1 text={"Create An Account"} />
          {/* Form - Body */}
          <div className="mt-9 flex flex-row space-x-2 w-full justify-between">
            <InputField
              id={"userFirstName"}
              name={"userFirstName"}
              type={"text"}
              value={signupInput.userFirstName}
              placeholder={"First Name*"}
              handleChange={handleChange}
            />
            <InputField
              id={"userLastName"}
              name={"userLastName"}
              type={"text"}
              value={signupInput.userLastName}
              placeholder={"Last Name*"}
              handleChange={handleChange}
            />
          </div>
          <div>
            <InputField
              id={"userEmail"}
              name={"userEmail"}
              type={"email"}
              value={signupInput.userEmail}
              placeholder={"Email Address*"}
              handleChange={handleChange}
            />
            <InputField
              id={"userPassword"}
              name={"userPassword"}
              type={"password"}
              value={signupInput.userPassword}
              placeholder={"Password*"}
              handleChange={handleChange}
            />
          </div>
          {/* Submit Form Button */}
          <div className="mt-9">
            <ButtonSubmit btnText={"CREATE ACCOUNT"} />
          </div>
        </form>
        {/* Status message after login API call */}
        <div
          className={`mt-9 py-3 px-2 text-xxs ${
            actionResponse?.status === undefined
              ? "hidden"
              : actionResponse?.status === "Success"
              ? "bg-alertInfoBg text-alertInfoFont"
              : "bg-alertPinkInfoBg text-alertWarningFont"
          } `}
        >
          {actionResponse?.message}
        </div>
      </div>
    </>
  );
};

export default SignUp;
