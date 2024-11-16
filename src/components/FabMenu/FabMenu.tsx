import MenuIcon from "@mui/icons-material/Menu";
import { Box, CircularProgress, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Fab } from "../Shared/MuiWrap";
import { useMenuItems } from "./useMenuItems";

export function FabMenu() {
  const menuItems = useMenuItems();

  const [isLoading, setIsLoading] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        position: "fixed",
        right: {
          xs: "1rem",
          sm: "2rem",
          md: "4rem",
        },
        bottom: {
          xs: "1rem",
          sm: "2rem",
        },
        zIndex: 1000,
      }}
    >
      <Fab
        color="primary"
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disabled={isLoading}
      >
        {isLoading ? (
          <CircularProgress size={24} sx={{ color: "primary.contrastText" }} />
        ) : (
          <MenuIcon />
        )}
      </Fab>

      <Menu
        anchorEl={anchorEl}
        id="app-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        anchorReference="anchorEl"
        disableScrollLock
      >
        {menuItems.map((item) => {
          if (item.onClick) {
            return (
              <MenuItem
                key={item.id}
                onClick={async () => {
                  setIsLoading(true);
                  await item.onClick();
                  setIsLoading(false);
                }}
              >
                <Stack flexDirection="row" gap={1.5}>
                  {item.icon}
                  {item.label}
                </Stack>
              </MenuItem>
            );
          }

          return (
            <MenuItem key={item.id} component={Link} to={item.to}>
              <Stack flexDirection="row" gap={1.5}>
                {item.icon}
                {item.label}
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
}
