import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguageOptions } from "./useLanguageOptions";

export function LanguageSelector() {
  const { i18n, t } = useTranslation();

  const languageOptions = useLanguageOptions();

  const [open, setOpen] = useState(false);

  return (
    <FormControl sx={{ minWidth: 120 }}>
      <InputLabel id="language-selector">
        {t("languageSelector.label", "Language")}
      </InputLabel>
      <Select
        id="language-selector"
        label={t("languageSelector.label", "Language")}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        value={i18n.language}
        onChange={(e) => i18n.changeLanguage(e.target.value)}
      >
        {Object.values(languageOptions).map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
