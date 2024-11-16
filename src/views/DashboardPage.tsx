import { useTranslation } from "react-i18next";
import { PageTemplate } from "../components";

export function DashboardPage() {
  const { t } = useTranslation();

  return (
    <PageTemplate
      title={t("dashboardPage.title", "Dashboard")}
      withAppBar
    ></PageTemplate>
  );
}
