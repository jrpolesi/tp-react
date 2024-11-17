import { useEffect, useState } from "react";
import { ItemCount } from "../../types";
import { useItemApi } from "../api";

export function useItemsCountByTypeData(userId: string) {
  const [items, setItems] = useState<ItemCount[] | undefined>();
  const [error, setError] = useState<unknown | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const api = useItemApi();

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);

      try {
        const data = await api.getItemsCountByType(userId);

        setItems(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return {
    data: items,
    isLoading: isLoading,
    error,
  };
}
