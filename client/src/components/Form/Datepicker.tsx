import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { SignupDataType } from "../../types/User";
import { FormikErrors } from "formik";
import ValidationError from "./ValidationError";

interface Props {
  value: string;
  handleblur: (e: React.FocusEvent<unknown>) => void;
  setFieldValue: (
    field: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => Promise<void> | Promise<FormikErrors<SignupDataType>>;
  error?: string;
  touched?: boolean;
}

function Datepicker({
  value,
  setFieldValue,
  handleblur,
  error,
  touched,
}: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <label htmlFor="dob" className="text-xl font-bold">
        Date of Birth
      </label>
      <DatePicker
        format="DD-MM-YYYY"
        views={["year", "month", "day"]}
        value={value ? dayjs(value) : null}
        onChange={(newDate) => {
          setFieldValue("dob", dayjs(newDate).format("DD-MM-YYYY"), true);
        }}
        className=" rounded-md w-full bg-input shadow-slate-300/40 "
        sx={{
          "& .MuiInputBase-root": {
            color: "white",
          },
          "& .MuiSvgIcon-root": {
            color: "white",
          },
        }}
        disableFuture
        slotProps={{
          textField: {
            placeholder: "Date of birth",
            name: "dob",
            id: "dob",
            onBlur: handleblur,
          },
        }}
      />
      <ValidationError error={error} touched={touched} />
    </LocalizationProvider>
  );
}

export default Datepicker;
