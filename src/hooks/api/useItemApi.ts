import { useApiContext } from "../../contexts";

export function useItemApi() {
  const api = useApiContext();

  return api.item;
}
