import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthApi } from "../hooks";
import { User } from "../types";

type SessionContext = {
  user: User | null;
  session: Session | null;
};

const sessionContext = createContext<SessionContext>({
  user: null,
  session: null,
});

export function SessionProvider({ children }: PropsWithChildren<{}>) {
  const [contextValue, setContextValue] = useState<SessionContext>({
    user: null,
    session: null,
  });

  const api = useAuthApi();

  useEffect(() => {
    const subscription = api.subscribeSession((session) => {
      setContextValue({
        user: session?.user.user_metadata ?? null,
        session,
      });
    });

    return () => subscription.unsubscribe();
  }, [api]);

  return (
    <sessionContext.Provider value={contextValue}>
      {children}
    </sessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(sessionContext);
}
