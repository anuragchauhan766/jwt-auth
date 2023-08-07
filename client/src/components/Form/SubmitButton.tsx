import CircularProgress from "@mui/material/CircularProgress";
interface Props {
  disabled?: boolean;
  text: string;
  isSubmitting?: boolean;
}

function SubmitButton({ disabled, text, isSubmitting }: Props) {
  return (
    <button
      type="submit"
      className="border-none cursor-pointer rounded-full bg-ctc p-3 text-lg font-bold w-full  hover:scale-110 disabled:bg-gray-600 disabled:text-white disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center h-[52px]"
      disabled={disabled || isSubmitting}
    >
      {isSubmitting ? <CircularProgress size={20} /> : text}
    </button>
  );
}

export default SubmitButton;
