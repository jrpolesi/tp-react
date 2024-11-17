import { RefObject, useCallback, useEffect } from "react";

export function useInfiniteScroll(
  ref: RefObject<HTMLElement>,
  fetchMore: () => void
) {
  const handleScroll = useCallback(() => {
    const elementBottom = ref?.current?.getBoundingClientRect().bottom;

    if (elementBottom && elementBottom <= window.innerHeight) {
      fetchMore();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
}
