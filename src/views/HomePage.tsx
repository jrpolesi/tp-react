import { useTranslation } from "react-i18next";
import { Button, ErrorAlert } from "../components";
import { useAuthApi } from "../hooks";
import { BabyInfo } from "../components";

export function HomePage() {
  const { t } = useTranslation();
  const api = useAuthApi();

  return (
    <div>
      <h1>Home</h1>
      <BabyInfo />

      <ErrorAlert>
        {t("home.error", "An error occurred while trying to log out.")}
      </ErrorAlert>

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
