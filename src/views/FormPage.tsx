import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PageTemplate } from "../components";
import { DiaperForm } from "../components/BabyItemForm/DiaperForm";
import { FeedForm } from "../components/BabyItemForm/FeedForm";
import { SleepForm } from "../components/BabyItemForm/SleepForm";
import { useSessionContext, useSnackBarContext } from "../contexts";
import { useItemApi } from "../hooks";
import { ItemType } from "../types";

export function FormPage() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const { open } = useSnackBarContext();

  const api = useItemApi();

  const { user } = useSessionContext();

  if (!user) {
    throw new Error("User is not logged in");
  }

  const formType = (searchParams.get("type") ?? "sleep") as ItemType;

  const form = useItemForm(formType);

  return (
    <PageTemplate withAppBar title={form.title}>
      <form.component
        sx={{
          margin: "2rem auto 0",
        }}
        onFormSubmit={async (value) => {
          await api.createItem({
            type: formType,
            userId: user.id,
            ...value,
          });

          open({
            content: t("formPage.submit.success", "Saved successfully"),
            severity: "success",
          });

          navigate("/");
        }}
      />
    </PageTemplate>
  );
}

function useItemForm(formType: ItemType) {
  const { t } = useTranslation();

  const options = {
    sleep: {
      title: t("formPage.sleep.title", "Sleep"),
      component: SleepForm,
    },
    diaper: {
      title: t("formPage.sleep.title", "Diaper"),
      component: DiaperForm,
    },
    eat: {
      title: t("formPage.sleep.title", "Eat"),
      component: FeedForm,
    },
  };

  return options[formType];
}
