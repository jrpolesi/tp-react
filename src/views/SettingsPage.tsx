import { BoxProps, Stack } from "@mui/material";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  BabyForm,
  Box,
  CentralizedSpinner,
  DarkModeSwitch,
  LanguageSelector,
  PageTemplate,
} from "../components";
import { useProfileApi, useProfileData, useSnackBar } from "../hooks";

export function SettingsPage() {
  const { t } = useTranslation();

  const api = useProfileApi();

  const { open, snackBar } = useSnackBar();

  const { data, error, isLoading } = useProfileData();

  return (
    <>
      <PageTemplate title={t("settingsPage.title", "Settings")} withAppBar>
        <Stack
          gap={4}
          sx={{
            padding: "2rem 0",
          }}
        >
          <SettingsSection
            title={t("settingsPage.siteSettings.title", "Site settings")}
          >
            <LanguageSelector />
            <DarkModeSwitch />
          </SettingsSection>

          {!!error && (
            <Alert severity="error" sx={{ marginTop: "1rem" }}>
              {t(
                "settingsPage.profileFetch.error",
                "An error occurred while fetching baby profile data"
              )}
            </Alert>
          )}

          {!data && isLoading && (
            <CentralizedSpinner sx={{ marginTop: "3rem" }} />
          )}

          {data && (
            <SettingsSection
              title={t(
                "settingsPage.babyInformation.title",
                "Baby information"
              )}
            >
              <BabyForm
                defaultValue={data}
                onFormSubmit={async (value) => {
                  await api.updateProfile({
                    id: data.id,
                    username: data.username,
                    ...value,
                  });
                  open({
                    content: t(
                      "settingsPage.babyInformation.submit.success",
                      "Baby information updated successfully"
                    ),
                    severity: "success",
                  });
                }}
                sx={{
                  width: "100%",
                }}
              />
            </SettingsSection>
          )}
        </Stack>
      </PageTemplate>

      {snackBar}
    </>
  );
}

type SettingsSectionProps = PropsWithChildren<{
  title: string;
  sx?: BoxProps["sx"];
}>;

function SettingsSection({ title, children, sx }: SettingsSectionProps) {
  return (
    <Stack
      component="fieldset"
      gap={3}
      sx={{
        borderColor: "primary.light",
        borderRadius: "4px",
        paddingTop: 2,
        ...sx,
      }}
    >
      <Box
        component="legend"
        sx={{
          paddingInline: ".5rem",
        }}
      >
        {title}
      </Box>

      {children}
    </Stack>
  );
}
