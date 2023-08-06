import { InputHTMLAttributes } from "react";
import PasswordField from "./PasswordField";
import ValidationError from "./ValidationError";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  touched?: boolean;
}

function TextInput({ label, error, touched, type, id, ...rest }: Props) {
  return (
    <div className="flex flex-col w-full sm:w-3/4 flex-1 space-y-2">
      <label htmlFor={id} className="text-xl font-bold">
        {label}
      </label>
      {type === "password" ? (
        <PasswordField id={id} {...rest} />
      ) : (
        <input
          id={id}
          {...rest}
          className="w-full text-white text-base font-semibold p-2 rounded-md outline-none border-none appearance-none  bg-input hover:outline-1 hover:outline-teal-50 shadow-slate-300/40 focus:border-5 focus:border-white"
        />
      )}
      <ValidationError error={error} touched={touched} />
    </div>
  );
}

export default TextInput;
