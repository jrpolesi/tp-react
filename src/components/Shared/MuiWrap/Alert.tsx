import { AlertProps, Alert as MuiAlert } from "@mui/material";

import { forwardRef } from "react";

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert severity="error" {...props} ref={ref} />;
});
