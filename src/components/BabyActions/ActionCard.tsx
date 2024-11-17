import AddIcon from "@mui/icons-material/Add";
import { Stack, StackProps } from "@mui/material";
import { Link } from "react-router-dom";
import { Button, Typography } from "../Shared";
import { Action } from "./BabyActions";

type ActionCardProps = {
  action: Action;
  sx?: StackProps["sx"];
};

export function ActionCard({ action, sx }: ActionCardProps) {
  const { Icon, title, label } = action;

  return (
    <Stack
      alignItems="center"
      flexDirection={{
        xs: "row",
        sm: "column",
      }}
      sx={{
        position: "relative",
        gap: {
          xs: "1.25rem",
          sm: ".75rem",
        },
        padding: {
          xs: ".75rem 1rem",
          sm: "1rem 1rem 2rem",
        },
        borderRadius: "1rem",
        boxShadow: 3,
        ...sx,
      }}
    >
      <Icon
        sx={{
          color: `${action.color}.main`,
          fontSize: "2rem",
        }}
      />

      <Stack alignItems={{ sm: "center" }} gap=".4rem">
        <Typography
          sx={{
            textAlign: {
              sm: "center",
            },
            fontSize: {
              xs: "1rem",
              sm: "1.1rem",
            },
            fontWeight: "bold",
            lineHeight: "1",
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{
            textAlign: {
              sm: "center",
            },
            fontSize: ".9rem",
            lineHeight: "1",
            color: "text.secondary",
          }}
        >
          {label}
        </Typography>
      </Stack>

      <Button
        component={Link}
        variant="contained"
        to={action.to}
        color={action.color as any}
        sx={{
          position: {
            sm: "absolute",
          },
          borderRadius: "2rem",
          width: "2.5rem",
          height: "2.5rem",
          minWidth: "0",
          bottom: 0,
          transform: {
            sm: "translateY(50%)",
          },
          zIndex: 100,
          marginLeft: {
            xs: "auto",
            sm: "unset",
          },
        }}
      >
        <AddIcon />
      </Button>
    </Stack>
  );
}
