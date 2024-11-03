import { useTranslation } from "react-i18next";
import { Button, supabase } from "../shared";

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
