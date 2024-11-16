import { useEffect, useState } from "react";
import { useSessionContext } from "../../contexts";
import { Profile } from "../../types";
import { useProfileApi } from "../useProfileApi";

export function useProfileData() {
  const [profile, setProfile] = useState<Profile | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const api = useProfileApi();
  const { user } = useSessionContext();

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);

      try {
        if (!user) {
          throw new Error("User is not logged in");
        }

        const data = await api.getProfile(user.id);
        setProfile(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();

    const subscription = api.subscribeToProfile(fetchProfile);

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    data: profile,
    isLoading,
    error,
  };
}
