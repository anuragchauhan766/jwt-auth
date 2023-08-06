import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
interface Props {
  error?: string;
  touched?: boolean;
}

function ValidationError({ error, touched }: Props) {
  return (
    <>
      {error && touched ? (
        <p className="text-red-400 flex items-center">
          <PriorityHighIcon
            sx={{
              fontSize: 20,
            }}
          />
          {error}
        </p>
      ) : null}
    </>
  );
}

export default ValidationError;
