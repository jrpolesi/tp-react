import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { Typography } from "./Typograph";

type CardWithIconProps = PropsWithChildren<{
  icon: React.ReactNode;
  title: string;
}>;

export function CardWithIcon({ icon, title, children }: CardWithIconProps) {
  return (
    <Stack>
      {icon}
      <Typography variant="h6">{title}</Typography>
      {children}
    </Stack>
  );
}
