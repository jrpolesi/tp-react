import { createContext, PropsWithChildren, useContext } from "react";
import { Api } from "../services";

const apiContext = createContext<Api | null>(null);

const URL = import.meta.env.VITE_SUPABASE_URL;
const KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const API = new Api(URL, KEY);

export function ApiProvider({ children }: PropsWithChildren<{}>) {
  return <apiContext.Provider value={API}>{children}</apiContext.Provider>;
}

export function useApiContext(): Api {
  const api = useContext(apiContext);
  if (!api) throw new Error("useApiContext must be used within a ApiProvider");
  return api;
}
