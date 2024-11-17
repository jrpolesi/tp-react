import { useEffect, useRef, useState } from "react";
import { Item } from "../../types";
import { useItemApi } from "../api";

const PAGE_LIMIT = 10;

export function useItemsData(userId: string) {
  const [items, setItems] = useState<Item[] | undefined>();
  const [error, setError] = useState<unknown | null>(null);
  const [pagination, setPagination] = useState({
    from: 0,
    to: PAGE_LIMIT - 1,
  });
  const [isLoading, setIsLoading] = useState(false);

  const hasMoreRef = useRef(true);
  const isLoadingRef = useRef(false);

  const api = useItemApi();

  useEffect(() => {
    async function fetchProfile() {
      updateIsLoading(true);

      try {
        const data = await api.getItems(userId, pagination.from, pagination.to);

        handleNewData(data);
      } catch (error) {
        setError(error);
      } finally {
        updateIsLoading(false);
      }
    }

    fetchProfile();
  }, [pagination.to, pagination.from]);

  function handleNewData(data: Item[]) {
    if (data.length < PAGE_LIMIT) {
      hasMoreRef.current = false;
    }

    setItems((prev) => {
      if (prev && prev.at(-1)?.id === data.at(-1)?.id) return prev;

      return [...(prev ?? []), ...data];
    });
  }

  function updateIsLoading(value: boolean) {
    isLoadingRef.current = value;
    setIsLoading(value);
  }

  function fetchNextPage() {
    setPagination((prev) => {
      if (!hasMoreRef.current || isLoadingRef.current) return prev;

      return {
        ...prev,
        from: prev.to + 1,
        to: prev.to + PAGE_LIMIT,
      };
    });
  }

  return {
    data: items,
    isLoading: isLoading,
    error,
    pagination: pagination,
    fetchNextPage,
  };
}
