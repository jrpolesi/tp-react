import { useTranslation } from "react-i18next";
import { DarkModeSwitch, LanguageSelector, PageTemplate } from "../components";

export function SettingsPage() {
  const { t } = useTranslation();

  return (
    <PageTemplate title={t("settingsPage.title", "Settings")} withAppBar>
      <LanguageSelector />
      <DarkModeSwitch />
    </PageTemplate>
  );
}
