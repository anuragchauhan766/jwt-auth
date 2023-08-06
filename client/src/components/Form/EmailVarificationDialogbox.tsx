import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function EmailVarificationDialog({ open, setOpen }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="email-dialog-title"
        aria-describedby="email-dialog-description"
      >
        <DialogTitle
          id="email-dialog-title"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            backgroundColor: "ctc.main",
            fontSize: "1.5rem",
          }}
        >
          <p>Email Varification</p>
        </DialogTitle>
        <DialogContent
          sx={{
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          <DialogContentText id="email-dialog-description">
            We have sent a verification email to your registered email address.
            <br />
            Please check your inbox
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
