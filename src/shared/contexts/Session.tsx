import { Session } from "@supabase/supabase-js";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../../services";
import { storage } from "../utils";

type User = {
  username: string;
  email: string;
};

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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      storage.setItem("@baby.token", session?.access_token);
      setContextValue({
        user: (session?.user.user_metadata as User) ?? null,
        session,
      });
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      storage.setItem("@baby.token", session?.access_token);
      setContextValue({
        user: (session?.user.user_metadata as User) ?? null,
        session,
      });
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <sessionContext.Provider value={contextValue}>
      {children}
    </sessionContext.Provider>
  );
}

export function useSessionContext() {
  return useContext(sessionContext);
}
