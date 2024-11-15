import { AlertProps, Alert as MuiAlert } from "@mui/material";

export function Alert(props: AlertProps) {
  return <MuiAlert severity="error" {...props} />;
}
