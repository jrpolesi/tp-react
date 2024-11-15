import { Alert, AlertProps } from "@mui/material";

export function ErrorAlert(props: AlertProps) {
  return <Alert severity="error" {...props} />;
}
