import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, CircularProgress, Menu, MenuItem, Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAuthApi } from "../hooks";
import { Fab } from "./Shared/MuiWrap";

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
        right: "4rem",
        bottom: "2rem",
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

function useMenuItems() {
  const { t } = useTranslation();

  const api = useAuthApi();

  return [
    {
      id: 1,
      icon: <SettingsIcon />,
      label: t("fabMenu.menu.item.settings.label", "Settings"),
      to: "/settings",
    },
    {
      id: 2,
      icon: <LeaderboardIcon />,
      label: t("fabMenu.menu.item.dashboard.label", "Dashboard"),
      to: "/dashboard",
    },
    {
      id: 3,
      icon: <LogoutIcon color="warning" />,
      label: t("fabMenu.menu.item.logout.label", "Logout"),
      onClick: async () => {
        await api.signOut();
      },
    },
  ];
}
