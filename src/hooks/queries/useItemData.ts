import { useEffect, useState } from "react";
import { Item } from "../../types";
import { useItemApi } from "../api";

export function useItemData(itemId?: string) {
  const [item, setItem] = useState<Item | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  const api = useItemApi();

  useEffect(() => {
    async function fetchProfile() {
      if (!itemId) {
        throw new Error("Item ID is required");
      }

      setIsLoading(true);

      try {
        const data = await api.getItem(itemId);
        setItem(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return {
    data: item,
    isLoading,
    error,
  };
}
