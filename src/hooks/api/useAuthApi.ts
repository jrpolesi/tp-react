import { useApiContext } from "../../contexts";

export function useAuthApi() {
  const api = useApiContext();

  return api.auth;
}
