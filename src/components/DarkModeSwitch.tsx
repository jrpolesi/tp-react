import { FormControl, FormLabel, Stack, useColorScheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Storage } from "../services";
import { Switch, Typography } from "./Shared/MuiWrap";

export function DarkModeSwitch() {
  const { t } = useTranslation();

  const { mode, setMode } = useColorScheme();

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">
        {t("darkModeSwitch.label", "Select theme")}
      </FormLabel>

      <Stack direction="row" spacing={1} alignItems="center">
        <Typography>{t("darkModeSwitch.light.label", "Light")}</Typography>
        <Switch
          checked={mode === "dark"}
          onChange={(e) => {
            Storage.setTheme(e.currentTarget.checked ? "dark" : "light");
            setMode(e.currentTarget.checked ? "dark" : "light");
          }}
        />
        <Typography>{t("darkModeSwitch.dark.label", "Dark")}</Typography>
      </Stack>
    </FormControl>
  );
}
