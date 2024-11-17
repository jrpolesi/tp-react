import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import { useAuthApi } from "../../hooks";

export function useMenuItems() {
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
