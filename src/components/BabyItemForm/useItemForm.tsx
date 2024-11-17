import { useTranslation } from "react-i18next";
import { ItemType } from "../../types";
import { DiaperForm } from "./DiaperForm";
import { FeedForm } from "./FeedForm";
import { SleepForm } from "./SleepForm";

export function useItemForm(formType: ItemType) {
  const { t } = useTranslation();

  const options = {
    sleep: {
      title: t("useItemForm.sleep.title", "Sleep"),
      component: SleepForm,
    },
    diaper: {
      title: t("useItemForm.diaper.title", "Diaper"),
      component: DiaperForm,
    },
    eat: {
      title: t("useItemForm.eat.title", "Eat"),
      component: FeedForm,
    },
  };

  return options[formType];
}
