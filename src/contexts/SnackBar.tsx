import { createContext, PropsWithChildren, useContext } from "react";
import { useSnackBar } from "../hooks";

export type SnackBarMessage = {
  content: string;
  severity: "success" | "error" | "warning" | "info";
};

type SnackBarContextType = {
  open: (message: SnackBarMessage) => void;
  close: () => void;
};

const snackBarContext = createContext<SnackBarContextType | null>(null);

export function SnackBarProvider({ children }: PropsWithChildren<{}>) {
  const { open, close, snackBar } = useSnackBar();

  return (
    <snackBarContext.Provider value={{ open, close }}>
      {children}

      {snackBar}
    </snackBarContext.Provider>
  );
}

export function useSnackBarContext() {
  const context = useContext(snackBarContext);

  if (!context) {
    throw new Error(
      "useSnackBarContext must be used within a SnackBarProvider"
    );
  }

  return context;
}
