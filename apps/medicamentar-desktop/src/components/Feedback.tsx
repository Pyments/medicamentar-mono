import { Snackbar, Alert, AlertColor } from "@mui/material";

type FeedbackProps = {
  open: boolean;
  onClose: () => void;
  severity: AlertColor;
  message: string;
  autoHideDuration?: number;
};

export const Feedback = ({
  open,
  onClose,
  severity,
  message,
  autoHideDuration = 6000,
}: FeedbackProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};
