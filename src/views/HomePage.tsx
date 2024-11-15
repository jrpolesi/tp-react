import { useTranslation } from "react-i18next";
import { Alert, BabyInfo, Button } from "../components";
import { useAuthApi } from "../hooks";

export function HomePage() {
  const { t } = useTranslation();
  const api = useAuthApi();

  return (
    <div>
      <h1>Home</h1>
      <BabyInfo />

      <Alert severity="error">
        {t("home.error", "An error occurred while trying to log out.")}
      </Alert>

      <Button
        onClick={() => {
          api.signOut();
        }}
      >
        {t("home.logout", "Testando")}
      </Button>
    </div>
  );
}
