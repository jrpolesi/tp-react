import { BoxProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { AppBar } from "./AppBar";
import { Box, Container } from "./MuiWrap";

type PageTemplateProps = PropsWithChildren<{
  title?: string;
  withAppBar?: boolean;
  sx?: BoxProps["sx"];
}>;

export function PageTemplate({
  title,
  withAppBar,
  children,
  sx,
}: PageTemplateProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        ...sx,
      }}
    >
      {withAppBar && <AppBar title={title ?? ""} />}

      <Container>{children}</Container>
    </Box>
  );
}
