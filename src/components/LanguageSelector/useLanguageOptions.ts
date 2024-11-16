import { useTranslation } from "react-i18next";

export function useLanguageOptions(): Record<
  string,
  { label: string; value: string }
> {
  const { t } = useTranslation();

  return {
    en: {
      label: t("languageSelector.english.label", "English"),
      value: "en",
    },
    es: {
      label: t("languageSelector.spanish.label", "Spanish"),
      value: "es",
    },
    pt: {
      label: t("languageSelector.portuguese.label", "Portuguese"),
      value: "pt",
    },
  };
}
