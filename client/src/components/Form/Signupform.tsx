import GenderOptions from "./GenderInput";
import Datepicker from "./Datepicker";
import TextInput from "./TextInput";
import { useFormik } from "formik";
import { signUpschema } from "../../schemas";
import SubmitButton from "./SubmitButton";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import Error from "./Error";
import EmailVarificationDialog from "./EmailVarificationDialogbox";
import { SignupDataType } from "@src/types/User";

const defaultUserDetails: SignupDataType = {
  name: "",
  email: "",
  gender: "",
  dob: "",
  password: "",
};

function Signupform() {
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState<string>("");
  const { signup } = useAuth();
  const {
    values,
    touched,
    handleSubmit,
    handleChange,
    setFieldValue,
    errors,
    handleBlur,
    isValid,
    isSubmitting,
    setSubmitting,
    resetForm,
  } = useFormik({
    initialValues: defaultUserDetails,
    validationSchema: signUpschema,
    validateOnMount: true,
    onSubmit: async (values) => {
      const err = await signup(values);
      if (!err) {
        setOpen(true);
      }
      setErr(err);
      setSubmitting(false);
      resetForm();
    },
  });

  return (
    <form
      className="flex flex-col shrink w-full items-center space-y-7 px-4 sm:p-0"
      onSubmit={handleSubmit}
      autoComplete="off"
      noValidate
    >
      <TextInput
        type="text"
        placeholder="Profile Name"
        id="name"
        name="name"
        label="Profile Name"
        value={values.name ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
      />

      <TextInput
        type="email"
        placeholder="Your Email"
        id="email"
        name="email"
        label="Email"
        value={values.email ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
      />

      <TextInput
        type="password"
        placeholder="Password"
        id="password"
        name="password"
        label="Password"
        value={values.password ?? ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
      />

      <div className="flex flex-col w-full sm:w-3/4 flex-1 space-y-2">
        <Datepicker
          value={values.dob ?? ""}
          setFieldValue={setFieldValue}
          handleblur={handleBlur}
          error={errors.dob}
          touched={touched.dob}
        />
      </div>
      <div className="flex flex-col w-full sm:w-3/4 flex-1 space-y-2">
        <GenderOptions
          value={values.gender ?? ""}
          onChange={handleChange}
          handleblur={handleBlur}
          error={errors.gender}
          touched={touched.gender}
        />
      </div>
      <div className="flex justify-start w-full sm:w-3/4 text-xl">
        {err ? <Error err={err} /> : null}
      </div>
      <div className="w-full sm:w-1/2">
        <SubmitButton
          disabled={!isValid}
          text="Sign up"
          isSubmitting={isSubmitting}
        />
      </div>
      <EmailVarificationDialog open={open} setOpen={setOpen} />
    </form>
  );
}

export default Signupform;
