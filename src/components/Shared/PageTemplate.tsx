import { BoxProps } from "@mui/material";
import { PropsWithChildren } from "react";
import { AppBar } from "./AppBar";
import { Box, Container } from "./MuiWrap";

type PageTemplateProps = PropsWithChildren<{
  title?: string;
  withAppBar?: boolean;
  action?: React.ReactNode;
  sx?: BoxProps["sx"];
}>;

export function PageTemplate({
  title,
  withAppBar,
  children,
  action,
  sx,
}: PageTemplateProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        ...sx,
      }}
    >
      {withAppBar && <AppBar title={title ?? ""} action={action} />}

      <Container>{children}</Container>
    </Box>
  );
}
