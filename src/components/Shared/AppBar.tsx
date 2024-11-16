import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Box, IconButton, Typography } from "./MuiWrap";

type AppBarProps = {
  title: string;
};

export function AppBar({ title }: AppBarProps) {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "sticky",
        left: 0,
        top: 0,
        padding: {
          xs: ".75rem",
          sm: "1rem",
        },
        zIndex: 1100,
      }}
    >
      <IconButton
        component={forwardRef(({ children }, _) => (
          <Box
            itemRef={undefined}
            component={Link}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              left: "1rem",
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
        }}
      >
        {title}
      </Typography>
    </Box>
  );
}
