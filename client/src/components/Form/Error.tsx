import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

interface Props {
  err: string;
}

const Error: React.FC<Props> = ({ err }) => {
  return (
    <p className="text-red-400 ">
      <PriorityHighIcon
        sx={{
          fontSize: 20,
        }}
      />
      {err}
    </p>
  );
};

export default Error;
