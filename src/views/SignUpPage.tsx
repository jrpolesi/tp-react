import { Stack } from "@mui/material";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { baby } from "../assets";
import { Box, PageTemplate, SignUpForm, Typography } from "../components";
import { useAuthApi } from "../hooks";

export function SignUpPage() {
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
          gap: "1.8rem",
        }}
      >
        <Stack spacing={1.5} alignItems="center">
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
            {t("signUn.title", "Baby manager")}
          </Typography>

          <Box
            component="img"
            src={baby}
            alt="Baby"
            sx={{
              width: {
                xs: "6rem",
                sm: "8rem",
              },
              border: (theme) => `.25rem solid ${theme.palette.primary.main}`,
              borderRadius: "50%",
              padding: ".75rem",
            }}
          />
        </Stack>

        <Stack alignItems="center">
          <Typography
            variant="h2"
            sx={{
              fontSize: "1.8rem",
              fontWeight: "500",
              textAlign: "center",
            }}
          >
            {t("signUn.CreateAccountMessage", "Start managing your baby")}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: "center",
            }}
          >
            <Trans
              i18nKey="signUn.signInRedirect"
              defaults="If you already have an account, sign in <linkRedirect>here</linkRedirect>."
              components={{
                linkRedirect: <Link to="/signin" />,
              }}
            />
          </Typography>
        </Stack>
        <SignUpForm
          onFormSubmit={async (value) => {
            await api.signUp(value);
          }}
          sx={{
            width: "100%",
          }}
        />
      </Box>
    </PageTemplate>
  );
}
