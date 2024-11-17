import { Stack } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { baby } from "../assets";
import { Box, PageTemplate, SignInForm, Typography } from "../components";
import { useAuthApi } from "../hooks";

export function SignInPage() {
  const api = useAuthApi();

  const { t } = useTranslation();

  return (
    <PageTemplate
      sx={{
        margin: "2rem 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <Stack spacing={2} alignItems="center">
          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: "2.2rem",
                sm: "2.5rem",
              },
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {t("signIn.title", "Baby manager")}
          </Typography>

          <Box
            component="img"
            src={baby}
            alt="Baby"
            sx={{
              width: {
                xs: "10rem",
                sm: "12rem",
              },
              border: (theme) => `.4rem solid ${theme.palette.primary.main}`,
              borderRadius: "50%",
              padding: ".75rem",
            }}
          />
        </Stack>

        <Stack alignItems="center">
          <Typography
            variant="h2"
            sx={{
              fontSize: "2rem",
              fontWeight: "500",
            }}
          >
            {t("signIn.welcome", "Welcome")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
            }}
          >
            <Trans
              i18nKey="signIn.signUpRedirect"
              defaults="If you don't have an account, create <linkRedirect>here</linkRedirect>."
              components={{
                linkRedirect: <Link to="/signup" />,
              }}
            />
          </Typography>
        </Stack>
        <SignInForm
          onFormSubmit={async (value) => {
            await api.signIn(value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Box>
    </PageTemplate>
  );
}
