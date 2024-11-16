import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuthApi } from "../hooks";
import { Storage } from "../services";
import { User } from "../types";

type SessionContext = {
  isLoading: boolean;
  user: User | null;
  session: Session | null;
};

const sessionContext = createContext<SessionContext>({
  isLoading: false,
  user: null,
  session: null,
});

export function SessionProvider({ children }: PropsWithChildren<{}>) {
  const [contextValue, setContextValue] = useState<SessionContext>({
    user: null,
    session: null,
    isLoading: true,
  });

  const api = useAuthApi();

  useEffect(() => {
    const subscription = api.subscribeSession((session) => {
      const user = session?.user.user_metadata ?? null;
      Storage.setUser(session?.user.id ?? null);

      setContextValue({
        user: user,
        session,
        isLoading: false,
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
