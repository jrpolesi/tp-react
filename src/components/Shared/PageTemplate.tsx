import { BoxProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { Box } from "./MuiWrap";

type PageTemplateProps = PropsWithChildren<{
  sx: BoxProps["sx"];
}>;

export function PageTemplate({ children, sx }: PageTemplateProps) {
  return <Box sx={{ minHeight: "100vh", ...sx }}>{children}</Box>;
}
