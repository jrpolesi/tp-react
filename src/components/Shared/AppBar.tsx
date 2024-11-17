import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack } from "@mui/material";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Box, Container, IconButton, Typography } from "./MuiWrap";

type AppBarProps = {
  title: string;
  action?: React.ReactNode;
};

export function AppBar({ title, action }: AppBarProps) {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        alignItems: "center",
        justifyContent: "stretch",
        position: "sticky",
        left: 0,
        top: 0,
        zIndex: 1100,
        minHeight: "52px",
      }}
    >
      <Stack
        component={Container}
        flexDirection="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          width: "100%",
        }}
      >
        <IconButton
          component={forwardRef(({ children }, _) => (
            <Box
              itemRef={undefined}
              component={Link}
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              to="/"
            >
              {children}
            </Box>
          ))}
        >
          <ArrowBackIcon
            sx={{
              color: "primary.contrastText",
            }}
          />
        </IconButton>

        <Typography
          variant="h1"
          sx={{
            fontSize: "1.5rem",
            textAlign: "center",
            color: "inherit",
            flex: 10,
          }}
        >
          {title}
        </Typography>

        <Box sx={{ flex: 1 }}>{action}</Box>
      </Stack>
    </Box>
  );
}
