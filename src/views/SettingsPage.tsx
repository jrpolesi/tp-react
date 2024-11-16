import { useTranslation } from "react-i18next";
import {
  BabyForm,
  DarkModeSwitch,
  LanguageSelector,
  PageTemplate,
} from "../components";
import { useProfileApi, useProfileData } from "../hooks";

export function SettingsPage() {
  const { t } = useTranslation();

  const api = useProfileApi();

  const { data } = useProfileData();

  return (
    <PageTemplate title={t("settingsPage.title", "Settings")} withAppBar>
      <LanguageSelector />
      <DarkModeSwitch />

      {data && (
        <BabyForm
          defaultValue={data}
          onFormSubmit={async (value) => {
            await api.updateProfile({
              id: data.id,
              username: data.username,
              ...value,
            });
          }}
        />
      )}
    </PageTemplate>
  );
}
