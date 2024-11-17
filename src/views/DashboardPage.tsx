import { useTranslation } from "react-i18next";
import { Alert, CentralizedSpinner, Charts, PageTemplate } from "../components";
import { useSessionContext } from "../contexts";
import { useItemsCountByTypeData } from "../hooks";

export function DashboardPage() {
  const { t } = useTranslation();

  const { user } = useSessionContext();

  const { data, isLoading, error } = useItemsCountByTypeData(user?.id ?? "");

  return (
    <PageTemplate title={t("dashboardPage.title", "Dashboard")} withAppBar>
      {!!error && !data && (
        <Alert severity="error" sx={{ marginTop: "4rem" }}>
          {t("dashboardPage.error", "An error occurred while loading the data")}
        </Alert>
      )}

      {!data && isLoading && <CentralizedSpinner sx={{ minHeight: "10rem" }} />}

      {data && (
        <Charts data={{ itemsCount: data }} sx={{ marginTop: "4rem" }} />
      )}
    </PageTemplate>
  );
}
