import { useTranslation } from "react-i18next";
import { supabase } from "../services";
import { Button } from "../shared";

export function HomePage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the Home page!</p>

      <Button
        onClick={() => {
          supabase.auth.signOut();
        }}
      >
        {t("home.logout", "Testando")}
      </Button>
    </div>
  );
}
