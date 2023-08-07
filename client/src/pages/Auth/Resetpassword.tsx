import { useState } from "react";

import { NavLink as RouterNavLink, useSearchParams } from "react-router-dom";
import TextInput from "@components/Form/TextInput";
import { useFormik } from "formik";
import { useAuth } from "@context/AuthContext";
import { ResetPasswordSchema } from "@src/schemas";
import Error from "@components/Form/Error";
import SubmitButton from "@components/Form/SubmitButton";
import { Link } from "@mui/material";

const defaultValues = {
  password: "",
  cPassword: "",
};

function Resetpassword() {
  const [searchParams] = useSearchParams();
  const { resetpassword } = useAuth();
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
    initialValues: defaultValues,
    validationSchema: ResetPasswordSchema,
    validateOnMount: true,
    onSubmit: async (value) => {
      try {
        const resetpasswordToken = searchParams.get("t");
        if (resetpasswordToken === null) {
          seterr("Invalid Token, Please! Request a New Email");

          setSubmitting(false);
          resetForm();
          return;
        }
        const err = await resetpassword(value.password, resetpasswordToken);
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
    <div className="w-full h-screen flex  justify-center p-8">
      <div className="w-full max-w-3xl  bg-light-blue rounded-xl text-white p-2 sm:p-20 flex flex-col items-center">
        <h1 className="text-center font-bold text-2xl sm:text-5xl  sm:mt-0 my-10">
          Password Reset
        </h1>
        {showsuccess ? (
          <p className="font-bold text-ctc text-xl text-center w-3/4">
            Password has been Reset Successfully <br />
            <span className="text-secondary">
              You can{" "}
              <Link
                to="/auth/signin"
                component={RouterNavLink}
                className="text-ctc underline"
              >
                <span>Signin</span>
              </Link>{" "}
              now
            </span>
          </p>
        ) : null}
        <form
          className="flex flex-col shrink w-full items-center space-y-10 px-4 sm:p-0 my-10"
          onSubmit={handleSubmit}
        >
          <TextInput
            name="password"
            label="New Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.password}
            error={errors.password}
            type="password"
            id="password"
            placeholder="New Password"
          />
          <TextInput
            name="cPassword"
            label="Confirm New Password"
            value={values.cPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            touched={touched.cPassword}
            error={errors.cPassword}
            type="password"
            id="cPassword"
            placeholder="Confirm New Password"
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

export default Resetpassword;
