import {
  BoxProps,
  CircularProgress,
  CircularProgressProps,
} from "@mui/material";
import { Box } from "./MuiWrap";

type CentralizedSpinnerProps = BoxProps & {
  spinnerProps?: CircularProgressProps;
};

export function CentralizedSpinner({
  spinnerProps,
  ...props
}: CentralizedSpinnerProps) {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <CircularProgress {...spinnerProps} />
    </Box>
  );
}
