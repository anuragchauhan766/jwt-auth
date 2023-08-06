import SubmitButton from "@components/Form/SubmitButton";

import TextInput from "@components/Form/TextInput";
import { ForgotPasswordSchema } from "@src/schemas";
import { useFormik } from "formik";
import { useAuth } from "@context/AuthContext";
import { useState } from "react";
import Error from "@components/Form/Error";

const defaultEmail = {
  email: "",
};

function ForgotPassword() {
  const { forgotpassword } = useAuth();
  const [err, seterr] = useState("");
  const [showsuccess, setShowsuccess] = useState(false);
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    isValid,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: defaultEmail,
    validationSchema: ForgotPasswordSchema,
    validateOnMount: true,
    onSubmit: async (value) => {
      try {
        const err = await forgotpassword(value.email);
        if (err) {
          seterr(err);
        } else {
          setShowsuccess(true);
        }

        setSubmitting(false);
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });
  return (
    <div className="w-full h-screen flex  justify-center  p-8">
      <div className="w-full max-w-3xl  bg-light-blue rounded-xl text-white p-2 sm:p-20 flex flex-col items-center space-y-10">
        <h1 className="text-center font-bold text-2xl sm:text-5xl  sm:mt-0 ">
          Password Reset
        </h1>
        {showsuccess ? (
          <p className="text-center font-bold text-xl w-3/4 text-ctc">
            Email Sent Successfully
          </p>
        ) : (
          <p className="text-center font-medium text-md  w-3/4 px-2">
            Enter Your{" "}
            <span className="text-ctc">
              <b>Email address</b>
            </span>{" "}
            that you used to register. We'll send you an email with your name
            and a link to reset your password.
          </p>
        )}

        <form
          className="flex flex-col shrink w-full items-center space-y-10 px-4 sm:p-0 "
          onSubmit={handleSubmit}
        >
          <TextInput
            label="Email"
            name="email"
            id="email"
            placeholder="Email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
            touched={touched.email}
          />
          <div className="flex justify-start w-full sm:w-3/4 text-xl">
            {err ? <Error err={err} /> : null}
          </div>
          <div className="w-full sm:w-1/2 ">
            <SubmitButton
              disabled={!isValid}
              text="Sign in"
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
