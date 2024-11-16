import { useEffect, useState } from "react";
import { useSessionContext } from "../../contexts";
import { Item } from "../../types";
import { useItemApi } from "../api";

export function useItemsData() {
  const [items, setItems] = useState<Item[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
  });

  const api = useItemApi();
  const { user } = useSessionContext();

  useEffect(() => {
    async function fetchProfile() {
      setIsLoading(true);

      try {
        if (!user) {
          throw new Error("User is not logged in");
        }

        const data = await api.getItems(
          user.id,
          pagination.limit,
          pagination.offset
        );
        setItems(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProfile();

    const subscription = api.subscribeToItems(fetchProfile);

    return () => {
      subscription.unsubscribe();
    };
  }, [pagination.limit, pagination.offset]);

  function fetchNextPage() {
    setPagination((prev) => ({
      ...prev,
      offset: prev.offset + prev.limit,
    }));
  }

  return {
    data: items,
    isLoading,
    error,
    pagination: pagination,
    fetchNextPage,
  };
}
