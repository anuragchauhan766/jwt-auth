import Radio, { RadioProps } from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import ValidationError from "./ValidationError";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleblur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  touched?: boolean;
}

function CustomRadio(props: RadioProps) {
  return (
    <Radio
      sx={{
        color: "white",
        "&.Mui-checked": {
          color: "ctc.main",
        },
      }}
      {...props}
    />
  );
}

export default function GenderOptions({
  value,
  onChange,
  handleblur,
  error,
  touched,
}: Props) {
  return (
    <FormControl>
      <FormLabel id="gender" className="text-xl font-bold text-white">
        Gender
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="gender"
        name="gender"
        value={value}
        onChange={onChange}
        onBlur={handleblur}
      >
        <FormControlLabel
          value="Female"
          control={<CustomRadio />}
          label="Female"
        />
        <FormControlLabel value="Male" control={<CustomRadio />} label="Male" />
        <FormControlLabel
          value="Other"
          control={<CustomRadio />}
          label="Other"
        />
      </RadioGroup>
      <ValidationError error={error} touched={touched} />
    </FormControl>
  );
}
