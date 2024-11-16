import { Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { Typography } from ".";

type CardWithIconProps = PropsWithChildren<{
  icon: React.ReactNode;
  title: string;
  description: string;
}>;

export function CardWithIcon({ icon, title, description }: CardWithIconProps) {
  return (
    <Stack alignItems="center" gap=".6rem">
      {icon}

      <Stack alignItems="center" gap=".1rem">
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1rem",
            fontWeight: "bold",
            lineHeight: "1"
          }}
        >
          {title}
        </Typography>

        <Typography>{description}</Typography>
      </Stack>
    </Stack>
  );
}
