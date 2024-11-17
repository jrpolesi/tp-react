import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button, PageTemplate, Typography } from "../components";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <PageTemplate
      sx={{
        marginTop: "3rem",
      }}
    >
      <Stack
        alignItems="center"
        spacing={{
          xs: 4,
          sm: 7,
        }}
      >
        <Typography
          variant="h1"
          textAlign="center"
          fontSize={{
            xs: "3rem",
            sm: "4rem",
          }}
        >
          {t("notFoundPage.title", "Page not found")}
        </Typography>

        <Stack alignItems="center" spacing={4} maxWidth="24rem">
          <Typography textAlign="center">
            {t(
              "notFoundPage.message",
              "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."
            )}
          </Typography>

          <Button component={Link} to="/" variant="contained" size="large">
            {t("notFoundPage.backToHome", "Back to home")}
          </Button>
        </Stack>
      </Stack>
    </PageTemplate>
  );
}
