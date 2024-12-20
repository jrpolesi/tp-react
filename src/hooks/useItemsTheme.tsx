import BabyChangingStationIcon from "@mui/icons-material/BabyChangingStation";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function useItemsTheme() {
  const { t } = useTranslation();

  const [itemsTheme] = useState({
    sleep: {
      Icon: BedtimeIcon,
      color: "purple",
      title: t("babyItemTheme.sleep.title", "Sleep"),
    },
    eat: {
      Icon: RestaurantMenuIcon,
      color: "green",
      title: t("babyItemTheme.feed.title", "Feed"),
    },
    diaper: {
      Icon: BabyChangingStationIcon,
      color: "salmon",
      title: t("babyItemTheme.diaper.title", "Diaper"),
    },
  });

  return itemsTheme;
}
