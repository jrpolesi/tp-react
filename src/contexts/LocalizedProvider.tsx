import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

const dayjsLocales: Record<string, string> = {
  en: "en",
  es: "es",
  pt: "pt-br",
};

export function LocalizedProvider({ children }: PropsWithChildren<{}>) {
  const { i18n } = useTranslation();

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={dayjsLocales[i18n.language]}
    >
      {children}
    </LocalizationProvider>
  );
}
